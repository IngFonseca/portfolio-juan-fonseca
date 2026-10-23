import { defineConfig, devices } from '@playwright/test'

const remote = Boolean(process.env.BASE_URL)
const baseURL = process.env.BASE_URL ?? 'http://localhost:5173'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],
  // Con BASE_URL se prueba un sitio ya publicado: no hace falta arrancar el servidor local
  webServer: remote
    ? undefined
    : {
        command: 'npm run dev -- --port 5173 --strictPort',
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
})