import { expect, test } from '@playwright/test'
import { profile } from '../src/data/profile.js'

test('el pie de página muestra tu información y el año actual', async ({
  page,
}) => {
  await page.goto('/')
  const footer = page.getByRole('contentinfo')

  await expect(footer).toContainText(profile.name)
  await expect(footer).toContainText(profile.location)
  await expect(footer).toContainText(profile.status)
  await expect(footer).toContainText(`${new Date().getFullYear()} ©`)
})

test('el contador muestra el total que devuelve el servidor, con formato español', async ({
  page,
}) => {
  await page.route('**/api/visits', (route) =>
    route.fulfill({ json: { total: 1248, counted: true } }),
  )

  await page.goto('/')
  await expect(page.getByRole('contentinfo')).toContainText('1.248')
})

test('si el servicio falla, el contador se oculta y no muestra cifras inventadas', async ({
  page,
}) => {
  await page.route('**/api/visits', (route) =>
    route.fulfill({ status: 503, json: { error: 'unavailable' } }),
  )

  await page.goto('/')
  await expect(page.getByText('Visitas:')).toHaveCount(0)
})

test('registra la visita una sola vez por carga de página, con POST', async ({
  page,
}) => {
  const methods = []
  await page.route('**/api/visits', (route) => {
    methods.push(route.request().method())
    return route.fulfill({ json: { total: 7, counted: true } })
  })

  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('contentinfo')).toContainText('7')

  expect(methods).toEqual(['POST'])
})