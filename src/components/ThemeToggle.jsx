import { Moon, Sun } from '@phosphor-icons/react'
import { useTheme } from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Modo claro"
      className={styles.toggle}
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      <span className={styles.knob} aria-hidden="true" />
      <Sun className={`${styles.icon} ${styles.sun}`} size={18} weight="bold" aria-hidden="true" />
      <Moon className={`${styles.icon} ${styles.moon}`} size={18} weight="bold" aria-hidden="true" />
    </button>
  )
}

export default ThemeToggle