import { ArrowUpRight } from '@phosphor-icons/react'
import { certifications, education } from '../data/education'
import styles from './Education.module.css'

function Education() {
  return (
    <section id="formacion" className={styles.section}>
      <div className="container">
        <h2>Formación y certificaciones</h2>

        <div className={styles.grid}>
          <article className={styles.degree} data-reveal>
            <h3>{education.degree}</h3>
            <p className={styles.institution}>{education.institution}</p>
            <p className={styles.place}>{education.location}</p>
            <p className={styles.period}>{education.period}</p>
            <p className={styles.status}>{education.status}</p>
            <p className={styles.graduation}>{education.graduation}</p>
          </article>

          <div data-reveal style={{ '--reveal-delay': '120ms' }}>
            <h3 className={styles.certHeading}>Certificaciones</h3>
            <ul className={styles.certs}>
              {certifications.map((cert) => (
                <li key={cert.id} className={styles.cert}>
                  <div>
                    <p className={styles.certTitle}>{cert.title}</p>
                    <p className={styles.certIssuer}>{cert.issuer}</p>
                  </div>
                  {cert.url && (
                    <a
                      className={styles.certLink}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver certificado: ${cert.title}`}
                    >
                      Ver certificado
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education