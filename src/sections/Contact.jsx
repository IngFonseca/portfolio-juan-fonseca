import { useEffect, useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import Button from '../components/Button'
import { profile } from '../data/profile'
import styles from './Contact.module.css'

const displayUrl = (url) =>
  decodeURIComponent(url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))

// Una fila por canal. Las que no tienen enlace (por ejemplo Instagram) se descartan.
const rows = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'Perfil profesional',
    href: profile.links.linkedin,
    icon: LinkedinLogo,
    external: true,
  },
  {
    id: 'email',
    label: 'Correo',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: EnvelopeSimple,
    external: false,
    copy: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: profile.links.github ? displayUrl(profile.links.github) : '',
    href: profile.links.github,
    icon: GithubLogo,
    external: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: profile.links.instagram ? displayUrl(profile.links.instagram) : '',
    href: profile.links.instagram,
    icon: InstagramLogo,
    external: true,
  },
].filter((row) => row.href)

function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Si el navegador bloquea el portapapeles, se muestra la dirección para copiarla a mano
      window.prompt('Copia el correo:', profile.email)
    }
  }

  return (
    <section id="contacto" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro} data-reveal>
          <h2>Disponible para nuevas oportunidades</h2>

          {profile.cv && (
            <div className={styles.actions}>
              <Button
                href={profile.cv.file}
                download={profile.cv.downloadName}
                icon={<DownloadSimple size={20} aria-hidden="true" />}
              >
                Descargar hoja de vida
              </Button>
            </div>
          )}
        </div>

        <ul
          className={styles.links}
          data-reveal
          style={{ '--reveal-delay': '120ms' }}
        >
          {rows.map((row) => {
            const Icon = row.icon
            const externalProps = row.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <li key={row.id} className={styles.item}>
                <a
                  className={`${styles.link} ${row.copy ? styles.linkCopy : ''}`}
                  href={row.href}
                  {...externalProps}
                >
                  <Icon className={styles.icon} size={28} aria-hidden="true" />
                  <span className={styles.text}>
                    <span className={styles.label}>{row.label}</span>
                    <span className={styles.value}>{row.value}</span>
                  </span>
                  {!row.copy && (
                    <ArrowUpRight
                      className={styles.arrow}
                      size={22}
                      aria-hidden="true"
                    />
                  )}
                </a>

                {row.copy && (
                  <button
                    type="button"
                    className={styles.copy}
                    data-copied={copied}
                    aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
                    onClick={copyEmail}
                  >
                    {copied ? (
                      <Check size={18} aria-hidden="true" />
                    ) : (
                      <Copy size={18} aria-hidden="true" />
                    )}
                    <span className={styles.copyText}>
                      {copied ? 'Copiado' : 'Copiar'}
                    </span>
                  </button>
                )}
              </li>
            )
          })}
        </ul>

        <p className="sr-only" aria-live="polite">
          {copied ? 'Correo copiado al portapapeles' : ''}
        </p>
      </div>
    </section>
  )
}

export default Contact