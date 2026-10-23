import { expect, test } from '@playwright/test'

test.skip(
  !process.env.BASE_URL,
  'Solo se ejecuta contra el sitio publicado: define BASE_URL',
)

test('la función /api/visits está publicada y devuelve un total numérico', async ({
  request,
}) => {
  const response = await request.get('/api/visits')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('application/json')

  const body = await response.json()
  expect(Number.isInteger(body.total)).toBe(true)
})

// El User-Agent incluye «bot» y «headless»: el servidor lo ignora, así que esta prueba
// no suma visitas a tu contador real.
test('una petición automatizada recibe el total pero no lo modifica', async ({
  request,
  baseURL,
}) => {
  const before = (await (await request.get('/api/visits')).json()).total

  const response = await request.post('/api/visits', {
    headers: { origin: baseURL, 'user-agent': 'HeadlessBot automated test' },
  })
  expect(response.ok()).toBe(true)

  const body = await response.json()
  expect(body.counted).toBe(false)
  expect(body.total).toBe(before)
})

test('el pie de página publicado muestra un total real', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('contentinfo')).toContainText(/Visitas:\s*[\d.]+/i)
})