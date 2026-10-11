import { SoccerBall } from '@phosphor-icons/react'
import { about } from '../data/about'
import styles from './About.module.css'

function About() {
  return (
    <section id="sobre-mi" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.text} data-reveal>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.aside} data-reveal style={{ '--reveal-delay': '120ms' }}>
          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.outside}>
            <SoccerBall
              className={styles.outsideIcon}
              size={28}
              weight="duotone"
              aria-hidden="true"
            />
            <div>
              <h3>{about.outside.title}</h3>
              <p>{about.outside.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About