import { expect, test } from '@playwright/test'

const sizes = [
  { width: 375, height: 667 },
  { width: 480, height: 854 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]

const desktopSizes = sizes.filter((size) => size.width >= 1024)

// Sin desplazamiento horizontal, en los dos modos de color
for (const theme of ['dark', 'light']) {
  test.describe(`modo ${theme}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript(
        (value) => localStorage.setItem('theme', value),
        theme,
      )
    })

    for (const size of sizes) {
      test(`sin desplazamiento horizontal en ${size.width}×${size.height}`, async ({
        page,
      }) => {
        await page.setViewportSize(size)
        await page.goto('/')
        await page.waitForLoadState('networkidle')

        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }))
        expect(
          scrollWidth,
          `la página mide ${scrollWidth}px de ancho y la ventana ${clientWidth}px`,
        ).toBeLessThanOrEqual(clientWidth)
      })
    }
  })
}

// El escenario de Proyectos debe verse completo, sin hacer scroll dentro de la sección
for (const size of desktopSizes) {
  test(`Proyectos cabe en una sola pantalla en ${size.width}×${size.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(size)
    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Proyectos', exact: true })
      .click()

    // Los segmentos inferiores son lo último de la sección
    await expect(
      page.getByRole('group', { name: 'Elegir proyecto' }),
    ).toBeInViewport({ ratio: 1 })
  })
}

test.describe('navegación en móvil', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('el menú se abre, lleva a una sección y se cierra', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('navigation', { name: 'Principal' }),
    ).toBeHidden()

    await page.getByRole('button', { name: 'Menú', exact: true }).click()
    const menu = page.getByRole('dialog', { name: 'Menú de navegación' })
    await expect(menu).toBeVisible()

    await menu.getByRole('link', { name: 'Proyectos' }).click()
    await expect(menu).toBeHidden()
    await expect(page.locator('#proyectos')).toBeInViewport()
  })

  test('Escape cierra el menú y devuelve el foco al botón', async ({ page }) => {
    await page.goto('/')
    const open = page.getByRole('button', { name: 'Menú', exact: true })
    await open.click()
    const menu = page.getByRole('dialog', { name: 'Menú de navegación' })
    await expect(menu).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(open).toBeFocused()
  })

  test('el interruptor de tema también funciona dentro del menú', async ({
    page,
  }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Menú', exact: true }).click()
    const menu = page.getByRole('dialog', { name: 'Menú de navegación' })

    await menu.getByRole('switch', { name: 'Modo claro' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})

test('en escritorio la barra muestra los enlaces y no el botón de menú', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')

  await expect(
    page.getByRole('navigation', { name: 'Principal' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Menú', exact: true }),
  ).toBeHidden()
})

test.describe('movimiento reducido', () => {
  test('con la preferencia activada, el desplazamiento no es suave', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )
    expect(behavior).toBe('auto')
  })

  test('sin la preferencia, el desplazamiento entre secciones es suave', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    )
    expect(behavior).toBe('smooth')
  })
})