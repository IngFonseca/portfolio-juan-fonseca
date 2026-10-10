import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import styles from './Projects.module.css'

function Projects() {
  return (
    <section id="proyectos" className={styles.section}>
      <div className="container">
        <h2>Proyectos</h2>
        <p className={styles.intro}>
          {projects.length} proyectos entre aplicaciones de escritorio, web y
          académicas. Desliza para explorarlos.
        </p>
      </div>

      <div
        className={styles.track}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos"
        tabIndex={0}
      >
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.id} className={styles.item}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Projects