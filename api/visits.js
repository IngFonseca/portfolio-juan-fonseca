import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'

const TOTAL_KEY = 'visits:total'
const SEEN_PREFIX = 'visits:seen:'
const WINDOW_SECONDS = 24 * 60 * 60

// Navegadores sin cabeza, rastreadores y comprobadores de enlaces no cuentan como visitas
const BOT_PATTERN = /bot|crawl|spider|headless|preview|lighthouse|pingdom|uptime/i

// Solo estos dominios suman visitas. Las vistas previas de Vercel y tu entorno local
// reciben el total pero no lo modifican.
const ALLOWED_HOSTS = (
  process.env.VISITS_ALLOWED_HOSTS ?? 'portfolio-juan-fonseca.vercel.app'
)
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean)

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

function isAllowedOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    return ALLOWED_HOSTS.includes(new URL(origin).host)
  } catch {
    return false
  }
}

// Huella anónima: la IP y el navegador se mezclan con un secreto y se convierten en un
// código irreversible. No se guarda la IP, y la huella caduca a las 24 horas.
function fingerprint(request) {
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  const ip =
    forwarded.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const agent = request.headers.get('user-agent') ?? ''
  return createHash('sha256')
    .update(`${ip}|${agent}|${process.env.VISITS_SALT}`)
    .digest('hex')
}

async function readTotal(redis) {
  return Number((await redis.get(TOTAL_KEY)) ?? 0)
}

// Registra la visita (como máximo una por visitante cada 24 h) y devuelve el total
export async function POST(request) {
  if (!process.env.VISITS_SALT) {
    return json({ error: 'not-configured' }, 500)
  }

  try {
    const redis = Redis.fromEnv()
    const agent = request.headers.get('user-agent') ?? ''
    const countable = isAllowedOrigin(request) && !BOT_PATTERN.test(agent)

    if (countable) {
      const isNew = await redis.set(`${SEEN_PREFIX}${fingerprint(request)}`, 1, {
        nx: true,
        ex: WINDOW_SECONDS,
      })
      if (isNew) {
        return json({ total: await redis.incr(TOTAL_KEY), counted: true })
      }
    }

    return json({ total: await readTotal(redis), counted: false })
  } catch {
    return json({ error: 'unavailable' }, 503)
  }
}

// Solo lectura: devuelve el total sin sumar nada
export async function GET() {
  try {
    return json({ total: await readTotal(Redis.fromEnv()) })
  } catch {
    return json({ error: 'unavailable' }, 503)
  }
}