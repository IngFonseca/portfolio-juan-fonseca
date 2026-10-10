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
          </section>
        ))}
      </main>
    </>
  )
}

export default App