import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'theme'
const BROWSER_COLORS = { dark: '#0a0a0c', light: '#f5f1e8' }

function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })
  return () => observer.disconnect()
}

const getTheme = () =>
  document.documentElement.getAttribute('data-theme') === 'light'
    ? 'light'
    : 'dark'

const getServerTheme = () => 'dark'

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)

  const setTheme = (next) => {
    document.documentElement.setAttribute('data-theme', next)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BROWSER_COLORS[next])
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Sin almacenamiento disponible: el cambio funciona, pero no se recuerda
    }
  }

  return { theme, setTheme }
}