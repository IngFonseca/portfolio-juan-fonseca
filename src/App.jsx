import Navbar from './components/Navbar'
import { navItems } from './data/navigation'
import About from './sections/About'
import Hero from './sections/Hero'
import Technologies from './sections/Technologies'

const built = ['inicio', 'sobre-mi', 'tecnologias']

function App() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <About />
        <Technologies />
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