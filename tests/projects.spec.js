import { expect, test } from '@playwright/test'
import { projects } from '../src/data/projects.js'

// Texto del botón de descarga (cámbialo si lo renombraste, por ejemplo a «Descargar demo»)
const DOWNLOAD_LABEL = 'Descargar ejecutable'
const last = projects.length - 1
const dotName = (index) => `Proyecto ${index + 1}: ${projects[index].title}`

// Título del proyecto que muestra el panel de detalles
const currentTitle = (page) => page.locator('#proyectos h3')

test.beforeEach(async ({ page }) => {
  await page.goto('/#proyectos')
})

test('empieza en el primer proyecto con los controles en su estado inicial', async ({
  page,
}) => {
  await expect(currentTitle(page)).toHaveText(projects[0].title)
  await expect(
    page.getByRole('button', { name: 'Proyecto anterior' }),
  ).toBeDisabled()
  await expect(
    page.getByRole('button', { name: 'Proyecto siguiente' }),
  ).toBeEnabled()
})

test('anterior y siguiente cambian de proyecto y anuncian el cambio', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'Proyecto siguiente' }).click()
  await expect(currentTitle(page)).toHaveText(projects[1].title)
  await expect(page.locator('#proyectos [aria-live="polite"]')).toHaveText(
    `Proyecto 2 de ${projects.length}: ${projects[1].title}`,
  )

  await page.getByRole('button', { name: 'Proyecto anterior' }).click()
  await expect(currentTitle(page)).toHaveText(projects[0].title)
})

test('las flechas, Inicio y Fin del teclado recorren los proyectos', async ({
  page,
}) => {
  await page.getByRole('region', { name: 'Proyectos' }).focus()

  await page.keyboard.press('ArrowRight')
  await expect(currentTitle(page)).toHaveText(projects[1].title)

  await page.keyboard.press('End')
  await expect(currentTitle(page)).toHaveText(projects[last].title)
  await expect(
    page.getByRole('button', { name: 'Proyecto siguiente' }),
  ).toBeDisabled()

  await page.keyboard.press('Home')
  await expect(currentTitle(page)).toHaveText(projects[0].title)
})

test('los segmentos inferiores saltan al proyecto elegido', async ({ page }) => {
  const target = Math.min(3, last)
  const dot = page.getByRole('button', { name: dotName(target), exact: true })

  await dot.click()
  await expect(currentTitle(page)).toHaveText(projects[target].title)
  await expect(dot).toHaveAttribute('aria-current', 'true')
})

// Regla del portafolio: un botón aparece solo si su enlace existe
for (const [index, project] of projects.entries()) {
  test(`«${project.title}» muestra solo los botones que tienen enlace`, async ({
    page,
  }) => {
    await page
      .getByRole('button', { name: dotName(index), exact: true })
      .click()
    await expect(currentTitle(page)).toHaveText(project.title)

    const buttons = [
      ['Ver proyecto', project.links.demo],
      ['Descargar ejecutable', project.links.download],
      ['Ver en GitHub', project.links.github],
    ]

    for (const [label, href] of buttons) {
      const link = page.getByRole('link', {
        name: `${label}: ${project.title}`,
        exact: true,
      })
      if (href) {
        await expect(link).toHaveAttribute('href', href)
        if (label === DOWNLOAD_LABEL) {
          // La descarga empieza sin abrir pestañas y apunta a un archivo, no a una página
          await expect(link).not.toHaveAttribute('target', '_blank')
          expect(href).toMatch(/\.exe$/)
        } else {
          await expect(link).toHaveAttribute('target', '_blank')
          await expect(link).toHaveAttribute('rel', /noopener/)
        }
      } else {
        await expect(link).toHaveCount(0)
      }
    }

    // Y ningún otro enlace «suelto» en la sección
    const expected = buttons.filter(([, href]) => href).length
    await expect(page.locator('#proyectos a')).toHaveCount(expected)
  })
}

test('las capturas configuradas cargan y tienen texto alternativo', async ({
  page,
}) => {
  const pending = []

  for (const [index, project] of projects.entries()) {
    if (!project.image) {
      pending.push(project.title)
      continue
    }

    await page
      .getByRole('button', { name: dotName(index), exact: true })
      .click()
    const image = page.locator('#proyectos li[data-position="active"] img')

    await expect(image).toHaveAttribute('alt', /\S/)
    await expect
      .poll(() => image.evaluate((el) => el.complete && el.naturalWidth > 0))
      .toBe(true)
  }

  // Las capturas que faltan se avisan, pero no hacen fallar la prueba todavía
  if (pending.length > 0) {
    test.info().annotations.push({
      type: 'capturas pendientes',
      description: pending.join(', '),
    })
  }

  // Antes de publicar la versión final, actívala para que falle si falta alguna
  if (process.env.STRICT_IMAGES) expect(pending).toEqual([])
})
