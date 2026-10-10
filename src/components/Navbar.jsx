import { useEffect, useRef, useState } from 'react'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import styles from './Navbar.module.css'

const sectionIds = navItems.map((item) => item.id)

function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const dialogRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = (event) => {
      if (event.matches) dialogRef.current?.close()
    }
    query.addEventListener('change', closeOnDesktop)
    return () => query.removeEventListener('change', closeOnDesktop)
  }, [])

  const openMenu = () => dialogRef.current?.showModal()
  const closeMenu = () => dialogRef.current?.close()

  return (
    <>
      <a className={styles.skip} href="#contenido">
        Saltar al contenido
      </a>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a
            className={styles.brand}
            href="#inicio"
            aria-label={`${profile.name}, ir al inicio`}
          >
            {profile.initials}
          </a>

          <nav className={styles.nav} aria-label="Principal">
            <ul className={styles.list}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    className={styles.link}
                    href={`#${item.id}`}
                    aria-current={activeId === item.id ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            aria-haspopup="dialog"
            onClick={openMenu}
          >
            Menú
          </button>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-label="Menú de navegación"
      >
        <div className={styles.sheetBar}>
          <a
            className={styles.brand}
            href="#inicio"
            onClick={closeMenu}
            aria-label={`${profile.name}, ir al inicio`}
          >
            {profile.initials}
          </a>
          <button type="button" className={styles.menuButton} onClick={closeMenu}>
            Cerrar
          </button>
        </div>

        <nav aria-label="Menú móvil">
          <ul className={styles.sheetList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={styles.sheetLink}
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  aria-current={activeId === item.id ? 'location' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </>
  )
}

export default Navbar