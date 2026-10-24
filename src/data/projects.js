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
      'App de escritorio para inventario y ventas conectada a una API REST propia (FastAPI y MySQL): cuatro roles con permisos, ventas con IVA y descuento, alertas de stock y reportes PDF.',
    image: '/projects/tecnosuministros.webp', 
    imageAlt: '',
    tags: [
      'Python',
      'Tkinter',
      'FastAPI',
      'MySQL',
      'FPDF',
      'REST API',
      'JWT',
      'MVC',
      'POO',
      'CRUD',
      'PyInstaller',
      'Render',
    ],
    category: 'desktop',
    status: 'completed',
    note: 'Demo para Windows. Windows puede mostrar un aviso porque el archivo no está firmado, y la primera conexión puede tardar hasta un minuto.',
    links: {
      github: 'https://github.com/IngFonseca/TecnoSuministrosS.A.S',
      demo: null,
      download:
        'https://github.com/IngFonseca/TecnoSuministrosS.A.S/releases/latest/download/TecnoSuministros.exe',
    },
  },
    {
    id: 'siuu-bross',
    title: 'Siuu.Bross',
    description: 'Juego 2D desarrollado con Python y Pygame.',
    image: '/projects/siuu.bross.webp',
    imageAlt: '',
    tags: ['Python', 'Pygame'],
    category: 'game',
    status: 'completed',
    links: { 
      github: 'https://github.com/IngFonseca/Siuu-Bross.git', 
      demo: null, 
      download: null 
    },
  },
  {
    id: 'algoritmo-fifo',
    title: 'Algoritmo FIFO',
    description: 'Implementación del algoritmo FIFO, desarrollada como proyecto técnico y académico.',
    image: '/projects/algoritmo-fifo.webp',
    imageAlt: '',
    tags: [], // PENDIENTE
    category: 'academic',
    status: 'completed',
    links: { 
      github: 'https://github.com/IngFonseca/Algoritmo_FIFO.git', 
      demo: null, 
      download: null 
    },
  },
  {
    id: 'simulador-shell',
    title: 'Simulador Shell SO',
    description: 'Simulador de una shell de sistema operativo, desarrollado como proyecto técnico.',
    image: '/projects/shell-personalizado.webp',
    imageAlt: '',
    tags: [], // PENDIENTE
    category: 'academic',
    status: 'completed',
    links: { 
      github: 'https://github.com/IngFonseca/Shell_Personalizado.git', 
      demo: null, 
      download: null 
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
    description: 'Por actualizar en el portafolio',
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
    description: 'Por actualizar en el portafolio',
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
    description: 'Por actualizar en el portafolio',
    image: null,
    imageAlt: '',
    tags: ['PHP'],
    category: 'web',
    status: 'completed',
    links: { github: null, demo: null, download: null },
  }
]

export const categoryLabels = {
  desktop: 'Escritorio',
  web: 'Web',
  game: 'Juego',
  academic: 'Académico',
  technical: 'Técnico',
}