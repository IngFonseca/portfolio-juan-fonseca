import Navbar from './components/Navbar'
import { navItems } from './data/navigation'
import { useReveal } from './hooks/useReveal'
import About from './sections/About'
import Education from './sections/Education'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Technologies from './sections/Technologies'

const built = ['inicio', 'sobre-mi', 'tecnologias', 'proyectos', 'formacion']

function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Education />
        {navItems
          .filter((item) => !built.includes(item.id))
          .map((item) => (
            <section
              key={item.id}
              id={item.id}
              data-theme="black"
              style={{
                minHeight: '70vh',
                padding: '6rem var(--gutter) var(--gutter)',
              }}
            >
              <h2>{item.label}</h2>
              <p>Sección en construcción.</p>
            </section>
          ))}
      </main>
    </>
  )
}

export default App