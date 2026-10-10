// Un proyecto nuevo = su imagen en public/projects/ + un objeto aquí.
// Los botones aparecen solo si su enlace existe (distinto de null).
// IMPORTANTE: los nombres de `tags` deben coincidir con los de src/data/skills.js
// (por ejemplo 'Python', 'MySQL', 'React') para que la sección Tecnologías
// marque esa habilidad como usada en un proyecto.
export const projects = [
  {
    id: 'tecnosuministros',
    title: 'TecnoSuministros',
    description:
      'Sistema de gestión de inventario y ventas con roles de usuario, proveedores, trabajadores, reportes en PDF y alertas de stock bajo.',
    image: null, // PENDIENTE: '/projects/tecnosuministros.webp'
    imageAlt: '',
    tags: ['Python', 'Tkinter', 'MySQL', 'FPDF', 'MVC'],
    category: 'desktop',
    status: 'completed',
    links: {
      github: 'https://github.com/IngFonseca/TecnoSuministrosS.A.S',
      demo: null,
      download: null, // PENDIENTE: enlace de GitHub Releases cuando exista
    },
  },
  {
    id: 'base-de-conocimiento',
    title: 'Base de Conocimiento de Soporte Técnico',
    description:
      'Gestión de incidentes con CRUD y persistencia en JSON, clasificación N1/N2/N3 y agentes de IA para diagnóstico, soluciones y escalamiento.',
    image: null,
    imageAlt: '',
    tags: ['Python', 'JSON', 'CRUD'],
    category: 'technical',
    status: 'completed',
    links: {
      github: 'https://github.com/IngFonseca/Base_de_Conocimiento_IA',
      demo: null,
      download: null, // PENDIENTE: solo si existe una versión ejecutable
    },
  },
  {
    id: 'veterinaria',
    title: 'Sistema Web de Gestión de una Veterinaria',
    description: 'Sistema web de gestión para una veterinaria.',
    image: null,
    imageAlt: '',
    tags: [], // PENDIENTE: tecnologías que usaste
    category: 'web',
    status: 'completed',
    links: {
      github: null, // PENDIENTE
      demo: null, // PENDIENTE: URL pública del proyecto desplegado
      download: null,
    },
  },
  {
    id: 'tarjetero-react',
    title: 'Tarjetero Web con React',
    description: 'Tarjetero web desarrollado con React.',
    image: null,
    imageAlt: '',
    tags: ['React'],
    category: 'web',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  },
  {
    id: 'cine-php',
    title: 'Gestión de Sillas de un Cine',
    description: 'Gestión de la reserva de sillas de un cine, desarrollada con PHP.',
    image: null,
    imageAlt: '',
    tags: ['PHP'],
    category: 'web',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  },
  {
    id: 'siuu-bross',
    title: 'Siuu.Bross',
    description: 'Juego 2D desarrollado con Python y Pygame.',
    image: null,
    imageAlt: '',
    tags: ['Python', 'Pygame'],
    category: 'game',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  },
  {
    id: 'algoritmo-fifo',
    title: 'Algoritmo FIFO',
    description: 'Implementación del algoritmo FIFO, desarrollada como proyecto técnico y académico.',
    image: null,
    imageAlt: '',
    tags: [], // PENDIENTE
    category: 'academic',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  },
  {
    id: 'simulador-shell',
    title: 'Simulador Shell SO',
    description: 'Simulador de una shell de sistema operativo, desarrollado como proyecto técnico.',
    image: null,
    imageAlt: '',
    tags: [], // PENDIENTE
    category: 'academic',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  },
]