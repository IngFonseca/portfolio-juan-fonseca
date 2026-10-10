import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import styles from './Technologies.module.css'

function getEvidence(skill) {
  const fromProjects = projects
    .filter((project) => project.tags.includes(skill.name))
    .map((project) => project.title)
  return [...fromProjects, ...(skill.alsoUsedIn ?? [])]
}

function Technologies() {
  return (
    <section id="tecnologias" className={styles.section}>
      <div className="container">
        <h2>Tecnologías con las que trabajo</h2>

        <ul className={styles.legend} aria-label="Leyenda">
          <li>
            <span className={`${styles.marker} ${styles.markerOn}`} aria-hidden="true" />
            Usada en un proyecto
          </li>
          <li>
            <span className={`${styles.marker} ${styles.markerOff}`} aria-hidden="true" />
            Conocimiento declarado
          </li>
        </ul>

        <div className={styles.groups}>
          {skillGroups.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3>{group.title}</h3>
              <ul className={styles.chips}>
                {group.skills.map((skill) => {
                  const showEvidence = group.showEvidence !== false
                  const evidence = showEvidence ? getEvidence(skill) : []
                  const state = !showEvidence
                    ? 'neutral'
                    : evidence.length > 0
                      ? 'proven'
                      : 'declared'

                  return (
                    <li
                      key={skill.name}
                      className={`${styles.chip} ${styles[state]}`}
                      title={
                        state === 'proven'
                          ? `Usada en: ${evidence.join(', ')}`
                          : undefined
                      }
                    >
                      {state === 'proven' && (
                        <span className={styles.dot} aria-hidden="true" />
                      )}
                      {skill.name}
                      {state === 'proven' && (
                        <span className="sr-only">
                          {' '}
                          (usada en: {evidence.join(', ')})
                        </span>
                      )}
                      {state === 'declared' && (
                        <span className="sr-only"> (conocimiento declarado)</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Technologies