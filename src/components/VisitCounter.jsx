import { useEffect, useState } from 'react'
import styles from './VisitCounter.module.css'

// 'always' evita que Intl omita el separador en números de cuatro cifras (1.248)
const formatter = new Intl.NumberFormat('es-CO', { useGrouping: 'always' })

// Una sola petición por carga de página, aunque el componente se monte más de una vez
let pending

function registerVisit() {
  pending ??= fetch('/api/visits', { method: 'POST' })
    .then((response) => {
      if (!response.ok) throw new Error('visits-unavailable')
      return response.json()
    })
    .then((data) => {
      if (!Number.isFinite(data.total)) throw new Error('visits-invalid')
      return data.total
    })
  return pending
}

function VisitCounter() {
  const [state, setState] = useState({ status: 'loading', total: null })

  useEffect(() => {
    let active = true
    registerVisit()
      .then((total) => {
        if (active) setState({ status: 'ready', total })
      })
      .catch(() => {
        if (active) setState({ status: 'error', total: null })
      })
    return () => {
      active = false
    }
  }, [])

  if (state.status === 'error') return null

  return (
    <p
      className={styles.visits}
      title="Una visita por visitante cada 24 horas"
    >
      <span>Visitas:</span>
      <span className={styles.number}>
        {state.status === 'ready' ? formatter.format(state.total) : '···'}
      </span>
    </p>
  )
}

export default VisitCounter