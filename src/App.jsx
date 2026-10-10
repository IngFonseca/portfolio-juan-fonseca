import { ArrowDown, DownloadSimple } from '@phosphor-icons/react'
import Button from './components/Button'
import Navbar from './components/Navbar'
import { navItems } from './data/navigation'
import { profile } from './data/profile'

function App() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        {navItems.map((item) => (
          <section
            key={item.id}
            id={item.id}
            style={{
              minHeight: '70vh',
              padding: '6rem var(--gutter) var(--gutter)',
              borderBottom: '1px solid var(--color-line)',
            }}
          >
            {item.id === 'inicio' ? <h1>{profile.name}</h1> : <h2>{item.label}</h2>}
            <p>
              {item.id === 'inicio' ? profile.role : 'Sección en construcción.'}
            </p>
            {item.id === 'inicio' && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginTop: '1.5rem',
                }}
              >
                <Button
                  href="#proyectos"
                  icon={<ArrowDown size={20} aria-hidden="true" />}
                >
                  Ver proyectos
                </Button>
                <Button
                  variant="secondary"
                  href="#contacto"
                  icon={<DownloadSimple size={20} aria-hidden="true" />}
                >
                  Descargar hoja de vida
                </Button>
              </div>
            )}
          </section>
        ))}
      </main>
    </>
  )
}

export default App