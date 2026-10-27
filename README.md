# Portafolio de Juan Fernando Fonseca Martínez

Portafolio profesional de desarrollo de software, construido con React y Vite y desplegado en Vercel.

**Sitio publicado:** https://portfolio-juan-fonseca.vercel.app

## Qué incluye

- **Escenario de proyectos** navegable con botones, teclado y deslizamiento táctil. Cada proyecto muestra solo los botones cuyo enlace existe: GitHub, demo desplegada o descarga del ejecutable.
- **Modo oscuro y modo claro**, con el oscuro como predeterminado, preferencia guardada y sin parpadeo al cargar.
- **Sección de tecnologías con evidencia:** una tecnología se marca como «usada» si aparece en las etiquetas de algún proyecto, y como «conocimiento declarado» si no. Se calcula automáticamente.
- **Contador de visitas real** con una función de Vercel y una base de datos Redis (ver más abajo).
- **Descarga de la hoja de vida** en PDF y botón para copiar el correo.
- **Accesibilidad:** HTML semántico, enlace para saltar al contenido, foco visible, navegación completa por teclado y respeto a `prefers-reduced-motion`.
- **SEO básico:** metadatos, Open Graph, favicon e imagen para compartir.

## Tecnologías

React, Vite, JavaScript, CSS moderno (variables, Grid, `clamp()`, CSS Modules), una función serverless de Vercel (Node.js), Upstash Redis, ESLint y Playwright con axe-core.

No usa backend propio, CMS ni panel de administración: el contenido vive en archivos de datos que solo yo puedo modificar.

## Cómo ejecutarlo

Requiere Node.js 20.19 o superior (o 22.12 o superior).

```bash
npm install
npm run dev
```

El sitio queda en `http://localhost:5173`. En este modo la carpeta `api/` no se ejecuta, así que el contador de visitas simplemente no se muestra. Para probarlo con la función real:

```bash
npx vercel link
npx vercel env pull .env.local
npx vercel dev
```

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Comprueba los archivos de `public/` y compila para producción |
| `npm run preview` | Sirve la versión compilada |
| `npm run lint` | Revisa el código con ESLint |
| `npm run check` | Verifica que existan las imágenes y el PDF que referencian los datos |
| `npm run test` | Pruebas de Playwright |
| `npm run test:ui` | Pruebas con interfaz visual |

## Estructura

```text
api/visits.js         Función de Vercel del contador de visitas
public/projects/      Capturas de los proyectos
public/documents/     Hoja de vida en PDF
scripts/              Comprobación de archivos referenciados
src/data/             Contenido: perfil, proyectos, habilidades, formación, textos
src/components/       Navbar, ThemeToggle, Button, ProjectInfo, Footer, VisitCounter...
src/sections/         Hero, About, Technologies, Projects, Education, Contact
src/hooks/            useTheme, useActiveSection, useReveal
src/styles/           Variables de diseño (tokens) y estilos globales
tests/                Pruebas de Playwright
```

El contenido está separado de la presentación: para cambiar un texto, un enlace o un proyecto no hace falta tocar ningún componente.

## Cómo agregar un proyecto

1. Copia la captura a `public/projects/` (nombre en minúsculas, con guiones).
2. Añade un objeto al arreglo de `src/data/projects.js`:

```js
{
  id: 'mi-proyecto',
  title: 'Mi proyecto',
  description: 'Máximo unos 180 caracteres.',
  image: '/projects/mi-proyecto.webp',
  imageAlt: 'Qué se ve en la captura',
  tags: ['Python', 'MySQL'],
  category: 'web', // desktop | web | game | academic | technical
  status: 'completed', // o 'in-progress'
  note: 'Opcional: una línea breve bajo las etiquetas',
  links: {
    github: 'https://github.com/...',
    demo: null, // URL de la web desplegada
    download: null, // enlace directo al .exe de un release de GitHub
  },
}
```

Los botones aparecen solo si su enlace no es `null`. Las etiquetas que coincidan con un nombre de `src/data/skills.js` marcan esa tecnología como «usada» en la sección Tecnologías. Los ejecutables se alojan en GitHub Releases, no en este repositorio.

## Contador de visitas

`POST /api/visits` registra una visita **como máximo una vez cada 24 horas por visitante** y devuelve el total. Las claves de la base de datos viven solo en el servidor.

- Cuenta **visitas**, no visitantes únicos: sin cookies ni cuentas no hay forma fiable de saber si dos visitas son de la misma persona.
- Se guarda una huella irreversible (IP y navegador mezclados con un secreto) durante 24 horas. No se almacena la IP.
- Se ignoran los rastreadores y navegadores automatizados.
- Las vistas previas de Vercel y el entorno local reciben el total, pero no lo modifican.
- Si el servicio no responde, el contador se oculta: nunca muestra una cifra inventada.

### Variables de entorno

Los nombres están en `.env.example`. En Vercel se crean al conectar una base de datos Upstash Redis desde el Marketplace.

| Variable | Uso |
|---|---|
| `KV_REST_API_URL` y `KV_REST_API_TOKEN` (o `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`) | Conexión a Redis |
| `VISITS_SALT` | Texto aleatorio para anonimizar a cada visitante |
| `VISITS_ALLOWED_HOSTS` | Opcional: dominios que pueden sumar visitas, separados por comas |

## Pruebas

```bash
npm run test
```

Cubren la navegación, el carrusel y los botones de cada proyecto, el tema claro y oscuro, el contacto y la descarga del PDF, el pie de página, la ausencia de desbordes horizontales en varios anchos y una auditoría de accesibilidad con axe en ambos modos.

Para comprobar el sitio publicado (no suman visitas al contador):

```bash
BASE_URL=https://portfolio-juan-fonseca.vercel.app npx playwright test tests/production.spec.js
```

En Windows (CMD): `set BASE_URL=https://portfolio-juan-fonseca.vercel.app&& npx playwright test tests/production.spec.js`.

## Despliegue

El repositorio está conectado a Vercel: cada `git push` a `main` genera un despliegue de producción. Antes de compilar, `npm run build` ejecuta `check`, que falla si el sitio referencia un archivo de `public/` que no existe, así que no se publica un botón o una imagen rotos.

## Autor

**Juan Fernando Fonseca Martínez**, desarrollador de software junior e Ingeniero de Sistemas en formación (Universidad Central, Bogotá).

- LinkedIn: https://www.linkedin.com/in/ing-juan-fernando-fonseca-mart%C3%ADnez
- GitHub: https://github.com/IngFonseca