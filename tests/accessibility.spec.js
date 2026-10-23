import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

const sizes = [
  { name: 'escritorio', width: 1440, height: 900 },
  { name: 'móvil', width: 375, height: 667 },
]

const summarize = (violations) =>
  violations.map((violation) => ({
    regla: violation.id,
    impacto: violation.impact,
    problema: violation.help,
    elementos: violation.nodes.map((node) => node.target.join(' ')),
  }))

for (const theme of ['dark', 'light']) {
  for (const size of sizes) {
    test(`accesibilidad (axe): modo ${theme}, ${size.name}`, async ({ page }) => {
      await page.addInitScript(
        (value) => localStorage.setItem('theme', value),
        theme,
      )
      await page.setViewportSize({ width: size.width, height: size.height })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Muestra ya todos los bloques con animación de aparición y espera a que terminen
      await page.evaluate(() => {
        document
          .querySelectorAll('[data-reveal]')
          .forEach((element) => element.setAttribute('data-revealed', ''))
      })
      await page.waitForTimeout(1500)

      const results = await new AxeBuilder({ page }).withTags(TAGS).analyze()
      expect(summarize(results.violations)).toEqual([])
    })
  }
}