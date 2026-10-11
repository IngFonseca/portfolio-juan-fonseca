import Navbar from './components/Navbar'
import { navItems } from './data/navigation'
import About from './sections/About'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Technologies from './sections/Technologies'
import { useReveal } from './hooks/useReveal'

const built = ['inicio', 'sobre-mi', 'tecnologias', 'proyectos']

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
        {navItems
          .filter((item) => !built.includes(item.id))
          .map((item) => (
            <section
              key={item.id}
              id={item.id}
              style={{
                minHeight: '70vh',
                padding: '6rem var(--gutter) var(--gutter)',
                borderTop: '1px solid var(--color-line)',
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