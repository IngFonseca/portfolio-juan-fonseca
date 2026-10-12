import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { profile } from '../src/data/profile.js'
import { projects } from '../src/data/projects.js'

const publicDir = fileURLToPath(new URL('../public/', import.meta.url))
const missing = []

function check(urlPath, owner) {
  if (!urlPath || !urlPath.startsWith('/')) return
  if (!existsSync(join(publicDir, urlPath))) {
    missing.push(`${owner}: ${urlPath}`)
  }
}

check(profile.cv?.file, 'profile.cv.file')
for (const project of projects) {
  check(project.image, `projects.${project.id}.image`)
}

if (missing.length > 0) {
  console.error('\n✖ Archivos referenciados que no existen en public/:')
  for (const item of missing) console.error(`  - ${item}`)
  console.error('')
  process.exit(1)
}

console.log('✔ Archivos de public/ verificados')