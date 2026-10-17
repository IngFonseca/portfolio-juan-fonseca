import WaterGesture from '../components/WaterGesture'
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

        <div
          className={styles.aside}
          data-reveal
          style={{ '--reveal-delay': '120ms' }}
        >
          <dl className={styles.facts}>
            {about.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <figure className={styles.outside}>
            <WaterGesture />
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>
                “{about.outside.quote} <strong>{about.outside.highlight}</strong>”
              </p>
            </blockquote>
            <figcaption className={styles.quoteBy}>
              <span>- {about.outside.author}</span>
              <span>{about.outside.note}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

export default About