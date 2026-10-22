import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { profile } from '../src/data/profile.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/#contacto')
})

test('los enlaces de contacto apuntan a los datos de profile.js', async ({
  page,
}) => {
  const contact = page.locator('#contacto')

  await expect(contact.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    profile.links.linkedin,
  )
  await expect(contact.getByRole('link', { name: /correo/i })).toHaveAttribute(
    'href',
    `mailto:${profile.email}`,
  )
  await expect(contact.getByRole('link', { name: /github/i })).toHaveAttribute(
    'href',
    profile.links.github,
  )

  const instagram = contact.getByRole('link', { name: /instagram/i })
  if (profile.links.instagram) {
    await expect(instagram).toHaveAttribute('href', profile.links.instagram)
  } else {
    await expect(instagram).toHaveCount(0)
  }
})

test('el botón Copiar deja el correo en el portapapeles', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])

  await page.getByRole('button', { name: 'Copiar correo' }).click()
  await expect(page.getByRole('button', { name: 'Correo copiado' })).toBeVisible()

  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toBe(profile.email)

  // Vuelve a su estado normal pasados unos segundos
  await expect(page.getByRole('button', { name: 'Copiar correo' })).toBeVisible({
    timeout: 6000,
  })
})

test('el botón de la hoja de vida descarga un PDF con el nombre correcto', async ({
  page,
}) => {
  const button = page
    .locator('#contacto')
    .getByRole('link', { name: 'Descargar hoja de vida' })

  // Regla del portafolio: sin PDF configurado, no debe haber botón
  if (!profile.cv) {
    await expect(button).toHaveCount(0)
    return
  }

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    button.click(),
  ])

  expect(download.suggestedFilename()).toBe(profile.cv.downloadName)

  const bytes = readFileSync(await download.path())
  expect(bytes.subarray(0, 4).toString()).toBe('%PDF')
  expect(bytes.length).toBeGreaterThan(1000)
})

test('el PDF está publicado en la ruta configurada', async ({ request }) => {
  test.skip(!profile.cv, 'profile.cv es null: no hay PDF que comprobar')

  const response = await request.get(profile.cv.file)
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('pdf')
})