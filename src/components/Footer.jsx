import { profile } from '../data/profile'
import styles from './Footer.module.css'
import VisitCounter from './VisitCounter'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.identity}>
          <p className={styles.name}>{profile.name}</p>
          <p className={styles.description}>{profile.location}</p>
          <p className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            Estado: {profile.status}
          </p>
        </div>

        <div className={styles.center}>
          <VisitCounter />
        </div>

        <p className={styles.legal}>
          {year} © {profile.name}
        </p>
      </div>
    </footer>
  )
}

export default Footer