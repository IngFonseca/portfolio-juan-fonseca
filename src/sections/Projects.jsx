import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ImageSquare } from '@phosphor-icons/react'
import ProjectInfo from '../components/ProjectInfo'
import { projects } from '../data/projects'
import styles from './Projects.module.css'

const SWIPE_DISTANCE = 50

function getPosition(offset) {
  if (offset === 0) return 'active'
  if (offset === -1) return 'prev'
  if (offset === 1) return 'next'
  return offset < 0 ? 'far-prev' : 'far-next'
}

function Projects() {
  const [index, setIndex] = useState(0)
  const pointerStart = useRef(null)
  const swiped = useRef(false)

  const last = projects.length - 1
  const active = projects[index]

  const goTo = (next) => setIndex(Math.min(Math.max(next, 0), last))

  const onKeyDown = (event) => {
    const keys = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: last,
    }
    if (event.key in keys) {
      event.preventDefault()
      goTo(keys[event.key])
    }
  }

  const onPointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY }
    swiped.current = false
  }

  const onPointerUp = (event) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      goTo(index + (dx < 0 ? 1 : -1))
    }
  }

  return (
    <section id="proyectos" className={styles.section} data-theme="black">
      <h2 className="sr-only">Proyectos</h2>

      <div
        className={styles.stage}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Proyectos"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        <div className={styles.scene}>
          <span className={styles.ghost} aria-hidden="true">
            PROYECTOS
          </span>

          <ul className={styles.slides}>
            {projects.map((project, i) => (
              <li
                key={project.id}
                className={styles.slide}
                data-position={getPosition(i - index)}
                aria-hidden={i !== index}
                onClick={() => {
                  if (i !== index && !swiped.current) goTo(i)
                }}
              >
                {project.image ? (
                  <img
                    className={styles.image}
                    src={project.image}
                    alt={i === index ? project.imageAlt : ''}
                    width="1600"
                    height="1000"
                    draggable={false}
                  />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    <ImageSquare size={36} weight="light" />
                    <span>Captura pendiente</span>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowPrev}`}
            aria-label="Proyecto anterior"
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={`${styles.arrow} ${styles.arrowNext}`}
            aria-label="Proyecto siguiente"
            disabled={index === last}
            onClick={() => goTo(index + 1)}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Proyecto {index + 1} de {projects.length}: {active.title}
      </p>

      <div className={`container ${styles.footer}`}>
        <div key={active.id} className={styles.panel}>
          <ProjectInfo
            project={active}
            position={index + 1}
            total={projects.length}
          />
        </div>

        <div className={styles.dots} role="group" aria-label="Elegir proyecto">
          {projects.map((project, i) => (
            <button
              key={project.id}
              type="button"
              className={styles.dot}
              aria-label={`Proyecto ${i + 1}: ${project.title}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects