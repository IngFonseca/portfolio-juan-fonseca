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
    imageAlt: 'Panel principal de TecnoSuministros con el resumen de ventas e inventario',
    tags: ['Python','Tkinter','FastAPI','MySQL','FPDF','REST API','JWT','MVC','POO','CRUD','PyInstaller','Render'],
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
    description:
      'Juego de plataformas 2D con pygame: 10 niveles de dificultad creciente, enemigos, plataformas móviles, vidas y puntuación. Los niveles son datos, así que agregar uno no toca el código.',
    image: '/projects/siuu.bross.webp',
    imageAlt: 'Pantalla principal de Siuu.Bross, botones de jugar y salir, teclas con los cuales jugar',
    tags: ['Python', 'Pygame', 'MVC', 'POO', 'PyInstaller'],
    category: 'game',
    status: 'completed',
    note: 'Juego para Windows, sin instalar Python. Windows puede mostrar un aviso porque el archivo no está firmado.',
    links: {
      github: 'https://github.com/IngFonseca/Siuu-Bross',
      demo: null,
      download: 'https://github.com/IngFonseca/Siuu-Bross/releases/latest/download/SiuuBross.exe',
    },
  },
  {
    id: 'algoritmo-fifo',
    title: 'Simulador del Algoritmo FIFO',
    description:
      'Simulador de planificación de procesos FIFO con interfaz gráfica: cola de capacidad limitada, procesos aleatorios, control de velocidad y métricas de espera, retorno y uso de CPU.',
    image: '/projects/algoritmo-fifo.webp',
    imageAlt: 'Simulador FIFO en ejecución con la cola de procesos, el proceso en CPU y las métricas de espera y retorno',
    tags: ['Python', 'Tkinter', 'MVC', 'POO', 'PyInstaller'],
    category: 'academic',
    status: 'completed',
    note: 'Ejecutable para Windows, sin instalar Python. Windows puede mostrar un aviso porque el archivo no está firmado.',
    links: {
      github: 'https://github.com/IngFonseca/Algoritmo_FIFO',
      demo: null,
      download: 'https://github.com/IngFonseca/Algoritmo_FIFO/releases/latest/download/Algoritmo_FIFO.exe',
    },
  },
  {
    id: 'simulador-shell',
    title: 'Shell Personalizado',
    description:
      'Shell de consola con 10 comandos propios en español para consultar procesos, memoria, red y discos, y terminar procesos con confirmación y protección de los críticos del sistema.',
    image: '/projects/shell-personalizado.webp',
    imageAlt: 'Consola del Shell Personalizado mostrando en una tabla la salida del comando misprocesos',
    tags: ['Python', 'psutil', 'tabulate', 'MVC', 'POO', 'PyInstaller'],
    category: 'technical',
    status: 'completed',
    note: 'Aplicación de consola: abre el .exe o ejecútala con Python 3.8+. Windows puede mostrar un aviso porque el archivo no está firmado.',
    links: {
      github: 'https://github.com/IngFonseca/Shell_Personalizado',
      demo: null,
      download: 'https://github.com/IngFonseca/Shell_Personalizado/releases/latest/download/Shell.exe',
    },
  },
  {
    id: 'base-de-conocimiento',
    title: 'Base de Conocimiento de Soporte Técnico',
    description:
      'Gestión de incidentes con CRUD y persistencia en JSON, clasificación N1/N2/N3 y agentes de IA para diagnóstico, soluciones y escalamiento.',
    image: null,
    imageAlt: 'Base de Conocimiento de soporte técnico con la lista de incidentes clasificados por nivel N1, N2 y N3',
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
    imageAlt: 'Página principal del sistema web de la veterinaria con [qué se ve: menú, citas, lista de mascotas...]',
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
    imageAlt: 'Tarjetero web hecho con React mostrando [qué se ve: varias tarjetas con ...]',
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
    imageAlt: 'Selección de sillas del cine con la cuadrícula de asientos libres y ocupados',
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