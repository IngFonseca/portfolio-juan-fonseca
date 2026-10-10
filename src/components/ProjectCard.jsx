import {
  ArrowUpRight,
  DownloadSimple,
  GithubLogo,
  ImageSquare,
} from '@phosphor-icons/react'
import { categoryLabels } from '../data/projects'
import Button from './Button'
import styles from './ProjectCard.module.css'

const MAX_TAGS = 4

function ProjectCard({ project }) {
  const { title, description, image, imageAlt, tags, category, status, links } =
    project

  const visibleTags = tags.slice(0, MAX_TAGS)
  const hiddenTags = tags.length - visibleTags.length
  const hasLinks = Boolean(links.github || links.demo || links.download)

  return (
    <article className={styles.card}>
      {image ? (
        <img
          className={styles.media}
          src={image}
          alt={imageAlt}
          width="1200"
          height="750"
          loading="lazy"
        />
      ) : (
        <div className={`${styles.media} ${styles.placeholder}`} aria-hidden="true">
          <ImageSquare size={32} weight="light" />
          <span>Captura pendiente</span>
        </div>
      )}

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{categoryLabels[category] ?? category}</span>
          {status === 'in-progress' && (
            <span className={styles.status}>En desarrollo</span>
          )}
        </p>

        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>

        {visibleTags.length > 0 && (
          <ul className={styles.tags} aria-label="Tecnologías">
            {visibleTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
            {hiddenTags > 0 && <li>+{hiddenTags}</li>}
          </ul>
        )}

        {hasLinks ? (
          <div className={styles.actions}>
            {links.demo && (
              <Button
                href={links.demo}
                external
                aria-label={`Ver proyecto: ${title}`}
                icon={<ArrowUpRight size={20} aria-hidden="true" />}
              >
                Ver proyecto
              </Button>
            )}
            {links.download && (
              <Button
                variant={links.demo ? 'secondary' : 'primary'}
                href={links.download}
                external
                aria-label={`Descargar ejecutable: ${title}`}
                icon={<DownloadSimple size={20} aria-hidden="true" />}
              >
                Descargar ejecutable
              </Button>
            )}
            {links.github && (
              <Button
                variant="secondary"
                href={links.github}
                external
                aria-label={`Ver en GitHub: ${title}`}
                icon={<GithubLogo size={20} aria-hidden="true" />}
              >
                Ver en GitHub
              </Button>
            )}
          </div>
        ) : (
          import.meta.env.DEV && (
            <p className={styles.devNote}>Sin enlaces todavía (solo visible en desarrollo).</p>
          )
        )}
      </div>
    </article>
  )
}

export default ProjectCard