// Las habilidades marcadas con `alsoUsedIn` tienen evidencia fuera de los
// proyectos de la lista: este mismo portafolio está hecho con ellas.
const THIS_PORTFOLIO = ['Este portafolio']

export const skillGroups = [
  {
    id: 'lenguajes',
    title: 'Lenguajes',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript', alsoUsedIn: THIS_PORTFOLIO },
      { name: 'PHP' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', alsoUsedIn: THIS_PORTFOLIO },
      { name: 'HTML5', alsoUsedIn: THIS_PORTFOLIO },
      { name: 'CSS3', alsoUsedIn: THIS_PORTFOLIO },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Flask' },
      { name: 'Django' },
      { name: 'Node.js' },
      { name: 'Express.js' },
    ],
  },
  {
    id: 'bases-de-datos',
    title: 'Bases de datos',
    skills: [{ name: 'MySQL' }, { name: 'PostgreSQL' }],
  },
  {
    id: 'herramientas',
    title: 'Herramientas',
    showEvidence: false, // las herramientas no se asocian a un proyecto concreto
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Visual Studio Code' },
      { name: 'Postman' },
      { name: 'Trello' },
    ],
  },
  {
    id: 'conceptos',
    title: 'Conceptos',
    skills: [
      { name: 'REST API' },
      { name: 'MVC' },
      { name: 'CRUD' },
      { name: 'POO' },
      { name: 'JWT' },
    ],
  },
]