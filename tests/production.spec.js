import { expect, test } from '@playwright/test'

test.skip(
  !process.env.BASE_URL,
  'Solo se ejecuta contra el sitio publicado: define BASE_URL',
)

// El navegador de estas pruebas se identifica como «headless», así que el servidor
// lo trata como bot y no suma visitas a tu contador real.
test.use({ userAgent: 'HeadlessChrome/141.0 (Playwright production check)' })

// Una detrás de otra: evita que unas pruebas alteren lo que miden las otras
test.describe.configure({ mode: 'default' })

test('la función /api/visits está publicada y devuelve un total numérico', async ({
  request,
}) => {
  const response = await request.get('/api/visits')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('application/json')

  const body = await response.json()
  expect(Number.isInteger(body.total)).toBe(true)
})

test('una petición automatizada recibe el total, pero el servidor no la cuenta', async ({
  request,
  baseURL,
}) => {
  const before = (await (await request.get('/api/visits')).json()).total

  const response = await request.post('/api/visits', {
    headers: { origin: baseURL, 'user-agent': 'HeadlessBot automated test' },
  })
  expect(response.ok()).toBe(true)

  const body = await response.json()
  // El servidor afirma que no sumó esta petición
  expect(body.counted).toBe(false)
  // Si entró una visita real mientras tanto, el total puede haber subido, nunca bajar
  expect(body.total).toBeGreaterThanOrEqual(before)
})

test('el pie de página publicado muestra un total real', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('contentinfo')).toContainText(/Visitas:\s*[\d.]+/i)
})