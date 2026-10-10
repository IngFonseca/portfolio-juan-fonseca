import { useEffect, useState } from 'react'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import styles from './Navbar.module.css'

const sectionIds = navItems.map((item) => item.id)

function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        </div>
      </header>
    </>
  )
}

export default Navbar