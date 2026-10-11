import { ArrowDown, DownloadSimple } from '@phosphor-icons/react'
import Button from '../components/Button'
import { profile } from '../data/profile'
import styles from './Hero.module.css'

const plain = (value) => ({ type: 'plain', value })
const key = (value) => ({ type: 'key', value })
const str = (value) => ({ type: 'string', value: `'${value}'` })

const stackTokens = profile.stack.flatMap((item, index) =>
  index === 0 ? [str(item)] : [plain(', '), str(item)],
)

const codeLines = [
  {
    indent: 0,
    tokens: [
      { type: 'keyword', value: 'const ' },
      { type: 'name', value: 'juan' },
      plain(' = {'),
    ],
  },
  { indent: 1, tokens: [key('rol'), plain(': '), str(profile.role), plain(',')] },
  {
    indent: 1,
    tokens: [key('ubicacion'), plain(': '), str(profile.location), plain(',')],
  },
  {
    indent: 1,
    tokens: [key('stack'), plain(': ['), ...stackTokens, plain('],')],
  },
  {
    indent: 1,
    tokens: [key('estudia'), plain(': '), str(profile.degree), plain(',')],
  },
  {
    indent: 1,
    tokens: [
      key('disponible'),
      plain(': '),
      { type: 'bool', value: String(profile.available) },
      plain(','),
    ],
  },
  { indent: 0, tokens: [plain('}')] },
]

function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={`${styles.role} ${styles.reveal}`} style={{ '--i': 0 }}>
            {profile.role}
          </p>
          <h1 className={styles.reveal} style={{ '--i': 1 }}>
            <span className={styles.given}>{profile.givenNames}</span>{' '}
            <span className={styles.surname}>{profile.surnames}</span>
          </h1>
          <p className={`${styles.lead} ${styles.reveal}`} style={{ '--i': 2 }}>
            {profile.heroText}
          </p>
          <div className={`${styles.actions} ${styles.reveal}`} style={{ '--i': 3 }}>
            <Button
              href="#proyectos"
              icon={<ArrowDown size={20} aria-hidden="true" />}
            >
              Ver proyectos
            </Button>
            {profile.cv && (
              <Button
                variant="secondary"
                href={profile.cv.file}
                download={profile.cv.downloadName}
                icon={<DownloadSimple size={20} aria-hidden="true" />}
              >
                Descargar hoja de vida
              </Button>
            )}
          </div>
        </div>

        <pre className={styles.panel} aria-hidden="true">
          <code>
            {codeLines.map((line, index) => (
              <span
                key={index}
                className={styles.line}
                style={{ '--i': index, '--indent': line.indent }}
              >
                {line.tokens.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={styles[token.type]}>
                    {token.value}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </section>
  )
}

export default Hero