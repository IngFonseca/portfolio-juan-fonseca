import { profile } from '../data/profile'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {profile.name}
        </p>
        <p>Hecho con React y Vite · {profile.location}</p>
      </div>
    </footer>
  )
}

export default Footer