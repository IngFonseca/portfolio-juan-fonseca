import { expect, test } from '@playwright/test'
import { navItems } from '../src/data/navigation.js'

test('la página abre con el título correcto y sin errores de consola', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() !== 'error') return
    // En desarrollo no existe /api/visits: ese fallo es esperado
    if (message.location().url.includes('/api/visits')) return
    errors.push(message.text())
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveTitle(/Juan Fernando Fonseca/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Fonseca')

  expect(errors).toEqual([])
})

test('cada enlace de la barra lleva a su sección y se marca como activo', async ({
  page,
}) => {
  await page.goto('/')
  const nav = page.getByRole('navigation', { name: 'Principal' })

  for (const item of navItems) {
    const link = nav.getByRole('link', { name: item.label, exact: true })
    await link.click()
    await expect(page.locator(`#${item.id}`)).toBeInViewport()
    await expect(link).toHaveAttribute('aria-current', 'location')
  }
})

test('el modo oscuro es el predeterminado y el cambio se recuerda', async ({
  page,
}) => {
  await page.goto('/')
  const html = page.locator('html')
  const toggle = page.getByRole('switch', { name: 'Modo claro' })

  await expect(html).toHaveAttribute('data-theme', 'dark')
  await expect(toggle).toHaveAttribute('aria-checked', 'false')

  await toggle.click()
  await expect(html).toHaveAttribute('data-theme', 'light')
  await expect(toggle).toHaveAttribute('aria-checked', 'true')

  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'light')
})