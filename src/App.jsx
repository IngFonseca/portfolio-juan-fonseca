import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { useReveal } from './hooks/useReveal'
import About from './sections/About'
import Contact from './sections/Contact'
import Education from './sections/Education'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Technologies from './sections/Technologies'

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
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App