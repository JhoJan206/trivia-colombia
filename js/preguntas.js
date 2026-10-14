'use strict';

/**
 * Banco de preguntas de Trivia Colombia.
 * Datos separados de la lógica del juego (RF / RNF-07).
 *
 * Categorías disponibles:
 *   geografia, historia, cultura, deportes, naturaleza
 * Dificultades:
 *   facil, medio, dificil
 *
 * Total: 50 preguntas (10 por categoría).
 */

/* El campo "icono" referencia una clave de ICONOS (js/iconos.js),
   que se renderiza como SVG en la interfaz. */
const CATEGORIAS = [
  { id: 'todas', nombre: 'Todas', icono: 'sombrero' },
  { id: 'geografia', nombre: 'Geografía', icono: 'montanas' },
  { id: 'historia', nombre: 'Historia', icono: 'pergamino' },
  { id: 'cultura', nombre: 'Cultura y Tradiciones', icono: 'mochila' },
  { id: 'deportes', nombre: 'Deportes', icono: 'balon' },
  { id: 'naturaleza', nombre: 'Ciencia y Naturaleza', icono: 'orquidea' }
];

const DIFICULTADES = [
  { id: 'facil', nombre: 'Fácil', multiplicador: 1, icono: 'cafe1' },
  { id: 'medio', nombre: 'Medio', multiplicador: 1.5, icono: 'cafe2' },
  { id: 'dificil', nombre: 'Difícil', multiplicador: 2, icono: 'cafe3' }
];

const PREGUNTAS = [
  /* ------------------------------ GEOGRAFÍA ------------------------------ */
  {
    id: 1,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital de Colombia?',
    opciones: ['Bogotá', 'Medellín', 'Cali', 'Cartagena'],
    correcta: 0,
    explicacion: 'Bogotá es la capital de la República de Colombia y sede del Gobierno nacional.'
  },
  {
    id: 2,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la capital del departamento de Santander?',
    opciones: ['Bucaramanga', 'Floridablanca', 'Girón', 'Socorro'],
    correcta: 0,
    explicacion: 'Bucaramanga es la capital de Santander y se conoce como «La Ciudad Bonita».'
  },
  {
    id: 3,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuántos océanos bañan las costas de Colombia?',
    opciones: ['Dos: Atlántico y Pacífico', 'Uno: Atlántico', 'Uno: Pacífico', 'Tres'],
    correcta: 0,
    explicacion: 'Colombia tiene costas en el océano Atlántico (mar Caribe) y en el océano Pacífico.'
  },
  {
    id: 4,
    categoria: 'geografia',
    dificultad: 'facil',
    enunciado: '¿Cuál es la isla más grande de Colombia?',
    opciones: ['San Andrés', 'Providencia', 'Isla Gorgona', 'Múcura'],
    correcta: 0,
    explicacion: 'San Andrés es la isla más grande del archipiélago colombiano en el mar Caribe.'
  },
  {
    id: 5,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal río de Colombia, que la recorre de sur a norte?',
    opciones: ['Río Magdalena', 'Río Cauca', 'Río Atrato', 'Río Meta'],
    correcta: 0,
    explicacion: 'El río Magdalena nace en el macizo colombiano y desemboca en el mar Caribe.'
  },
  {
    id: 6,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿En qué departamento se encuentra el Caño Cristales, el «río de los cinco colores»?',
    opciones: ['Meta', 'Caquetá', 'Huila', 'Guaviare'],
    correcta: 0,
    explicacion: 'El Caño Cristales está en la Serranía de la Macarena, en el departamento del Meta.'
  },
  {
    id: 7,
    categoria: 'geografia',
    dificultad: 'medio',
    enunciado: '¿Cuál es el principal puerto marítimo del Pacífico colombiano?',
    opciones: ['Buenaventura', 'Tumaco', 'Bahía Solano', 'Istmina'],
    correcta: 0,
    explicacion: 'Buenaventura, en el Valle del Cauca, es el puerto de mayor movimiento del Pacífico.'
  },
  {
    id: 8,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el pico más alto de Colombia?',
    opciones: ['Pico Cristóbal Colón', 'Nevado del Huila', 'Pico Simón Bolívar', 'Nevado del Ruiz'],
    correcta: 0,
    explicacion: 'El Pico Cristóbal Colón, en la Sierra Nevada de Santa Marta, supera los 5.700 metros.'
  },
  {
    id: 9,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el departamento más pequeño de Colombia?',
    opciones: ['San Andrés y Providencia', 'Atlántico', 'Quindío', 'Bogotá D. C.'],
    correcta: 0,
    explicacion: 'San Andrés y Providencia es el departamento con menor extensión territorial.'
  },
  {
    id: 10,
    categoria: 'geografia',
    dificultad: 'dificil',
    enunciado: '¿Cuál es el volcán activo más alto de Colombia?',
    opciones: ['Nevado del Ruiz', 'Galeras', 'Nevado del Huila', 'Puracé'],
    correcta: 0,
    explicacion: 'El Nevado del Ruiz, en Caldas y Tolima, alcanza cerca de 5.321 metros de altitud.'
  },

  /* ------------------------------ HISTORIA ------------------------------- */
  {
    id: 11,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué año se firmó el Acta de Independencia de Colombia?',
    opciones: ['1810', '1819', '1811', '1821'],
    correcta: 0,
    explicacion: 'El 20 de julio de 1810 se firmó el Acta de Independencia del Nuevo Reino de Granada.'
  },
  {
    id: 12,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Cuál es el día en que Colombia celebra su Independencia?',
    opciones: ['20 de julio', '7 de agosto', '20 de mayo', '15 de septiembre'],
    correcta: 0,
    explicacion: 'El 20 de julio se conmemora el Grito de Independencia de 1810 en Bogotá.'
  },
  {
    id: 13,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿Cómo es conocido Simón Bolívar en la historia de América?',
    opciones: ['El Libertador', 'El Protector', 'El Supremo', 'El General de Hierro'],
    correcta: 0,
    explicacion: 'Simón Bolívar es conocido como «El Libertador» por liderar la independencia de varios países.'
  },
  {
    id: 14,
    categoria: 'historia',
    dificultad: 'facil',
    enunciado: '¿En qué ciudad ocurrió el Grito de Independencia de 1810?',
    opciones: ['Bogotá', 'Cartagena', 'Tunja', 'Popayán'],
    correcta: 0,
    explicacion: 'El Grito de Independencia ocurrió en la plaza mayor de la Santafé de Bogotá.'
  },
  {
    id: 15,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se firmó la Constitución de Cúcuta?',
    opciones: ['1821', '1819', '1830', '1811'],
    correcta: 0,
    explicacion: 'La Constitución de Cúcuta, de 1821, organizó políticamente a la Gran Colombia.'
  },
  {
    id: 16,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿Qué heroína de la independencia es conocida como «La Pequeña Tirana»?',
    opciones: ['Policarpa Salavarrieta', 'María de los Ángeles Roldán', 'Antonia Santos', 'Manuela Beltrán'],
    correcta: 0,
    explicacion: 'Policarpa Salavarrieta fue una heroína neogranadina ejecutada por los realistas en 1817.'
  },
  {
    id: 17,
    categoria: 'historia',
    dificultad: 'medio',
    enunciado: '¿En qué año se separó Panamá de Colombia?',
    opciones: ['1903', '1899', '1910', '1886'],
    correcta: 0,
    explicacion: 'Panamá se separó de Colombia el 3 de noviembre de 1903.'
  },
  {
    id: 18,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Quién ejerció como vicepresidente de la Gran Colombia?',
    opciones: ['Francisco de Paula Santander', 'Francisco José de Caldas', 'José Hilario López', 'Rafael Núñez'],
    correcta: 0,
    explicacion: 'Santander fue vicepresidente de la Gran Colombia y es llamado «El Hombre de las Leyes».'
  },
  {
    id: 19,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Quién era el presidente de Colombia cuando se separó Panamá en 1903?',
    opciones: ['José Manuel Marroquín', 'Rafael Reyes', 'Manuel Antonio Sanclemente', 'Abelardo Pulido'],
    correcta: 0,
    explicacion: 'José Manuel Marroquín ejercía la presidencia de manera encargada en noviembre de 1903.'
  },
  {
    id: 20,
    categoria: 'historia',
    dificultad: 'dificil',
    enunciado: '¿Qué nombre tuvo Colombia entre 1863 y 1886?',
    opciones: ['Estados Unidos de Colombia', 'República de la Nueva Granada', 'Confederación Granadina', 'Imperio de los Andes'],
    correcta: 0,
    explicacion: 'La Constitución de Rionegro (1863) adoptó el nombre de Estados Unidos de Colombia.'
  },

  /* -------------------- CULTURA Y TRADICIONES --------------------------- */
  {
    id: 21,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Cómo se llama el plato típico de la región antioqueña?',
    opciones: ['Bandeja paisa', 'Ajiaco bogotano', 'Sancocho de gallina', 'Pandebono'],
    correcta: 0,
    explicacion: 'La bandeja paisa reúne frijoles, carne molida, chicharrón, huevo, aguacate y más.'
  },
  {
    id: 22,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿Qué instrumento musical es emblemático del vallenato?',
    opciones: ['Acordeón', 'Guitarra', 'Tambora', 'Gaita'],
    correcta: 0,
    explicacion: 'El acordeón es el instrumento central del vallenato, género de la costa caribe.'
  },
  {
    id: 23,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿En qué ciudad se encuentra el famoso Museo del Oro?',
    opciones: ['Bogotá', 'Medellín', 'Cartagena', 'Santa Marta'],
    correcta: 0,
    explicacion: 'El Museo del Oro está en Bogotá y conserva piezas prehispánicas de oro y cerámica.'
  },
  {
    id: 24,
    categoria: 'cultura',
    dificultad: 'facil',
    enunciado: '¿En qué municipio nació Gabriel García Márquez, premio Nobel de Literatura?',
    opciones: ['Aracataca', 'Macondo', 'Sucre', 'Cartagena'],
    correcta: 0,
    explicacion: 'García Márquez nació en Aracataca, Magdalena; Macondo es el pueblo de sus novelas.'
  },
  {
    id: 25,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se celebra el Carnaval declarado Patrimonio de la Humanidad por la UNESCO?',
    opciones: ['Barranquilla', 'Cartagena', 'Pasto', 'Cali'],
    correcta: 0,
    explicacion: 'El Carnaval de Barranquilla fue proclamado por la UNESCO como Patrimonio Cultural de la Humanidad.'
  },
  {
    id: 26,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿De qué región del país es originario el sombrero vueltiao?',
    opciones: ['Costa Caribe', 'Región Andina', 'Orinoquía', 'Amazonía'],
    correcta: 0,
    explicacion: 'El sombrero vueltiao es una artesanía del pueblo zenú, en la costa caribe (Córdoba y Sucre).'
  },
  {
    id: 27,
    categoria: 'cultura',
    dificultad: 'medio',
    enunciado: '¿En qué ciudad se realiza el Festival de Música del Pacífico Petronio Álvarez?',
    opciones: ['Cali', 'Buenaventura', 'Quibdó', 'Tumaco'],
    correcta: 0,
    explicacion: 'El festival Petronio Álvarez se celebra anualmente en Cali y honra la música del Pacífico.'
  },
  {
    id: 28,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿En qué año la UNESCO proclamó el Carnaval de Barranquilla como Obra Maestra del Patrimonio Oral e Inmaterial?',
    opciones: ['2003', '1995', '2008', '2015'],
    correcta: 0,
    explicacion: 'La UNESCO lo proclamó en 2003 y en 2008 lo inscribió en la Lista Representativa del Patrimonio.'
  },
  {
    id: 29,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿En qué año Gabriel García Márquez recibió el Premio Nobel de Literatura?',
    opciones: ['1982', '1972', '1990', '1995'],
    correcta: 0,
    explicacion: 'García Márquez recibió el Nobel de Literatura en 1982 por «Cien años de soledad» y su obra narrativa.'
  },
  {
    id: 30,
    categoria: 'cultura',
    dificultad: 'dificil',
    enunciado: '¿Qué vallenatero es conocido como «El Cacique de La Junta»?',
    opciones: ['Diomedes Díaz', 'Rafael Escalona', 'Alejandro Durán', 'José Alfredo Jiménez'],
    correcta: 0,
    explicacion: 'Diomedes Díaz, nacido en La Junta (Cesar), es uno de los íconos del vallenato.'
  },

  /* ------------------------------- DEPORTES ----------------------------- */
  {
    id: 31,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué deporte se destacó Egan Bernal al ganar el Tour de Francia?',
    opciones: ['Ciclismo', 'Natación', 'Atletismo', 'Boxeo'],
    correcta: 0,
    explicacion: 'Egan Bernal es ciclista y en 2019 se convirtió en el primer latinoamericano en ganar el Tour.'
  },
  {
    id: 32,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿En qué disciplina olímpica se consagró Mariana Pajón, «La Reina del BMX»?',
    opciones: ['BMX', 'Patinaje', 'Gimnasia', 'Remo'],
    correcta: 0,
    explicacion: 'Mariana Pajón es bicicromista colombiana, campeona olímpica y mundial de BMX.'
  },
  {
    id: 33,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cómo se llama la carrera ciclista por etapas más antigua de Colombia?',
    opciones: ['Vuelta a Colombia', 'Tour Colombia', 'Clásica El Carmen de Viboral', 'Vuelta a Guatemala'],
    correcta: 0,
    explicacion: 'La Vuelta a Colombia se disputa desde 1951 y es la prueba ciclista nacional por excelencia.'
  },
  {
    id: 34,
    categoria: 'deportes',
    dificultad: 'facil',
    enunciado: '¿Cuál es el deporte nacional de Colombia según la ley?',
    opciones: ['Tejo', 'Fútbol', 'Ciclismo', 'Pádel'],
    correcta: 0,
    explicacion: 'El Tejo fue declarado deporte nacional de Colombia por la Ley 613 de 2000.'
  },
  {
    id: 35,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿Qué ciclista colombiano ganó el Tour de Francia en 2019?',
    opciones: ['Egan Bernal', 'Nairo Quintana', 'Rigoberto Urán', 'Luis Herrera'],
    correcta: 0,
    explicacion: 'Egan Bernal, de Uramita (Antioquia), ganó el Tour de Francia 2019 con 22 años.'
  },
  {
    id: 36,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué edición de la Copa América Colombia salió campeón como local?',
    opciones: ['2001', '1993', '1999', '2004'],
    correcta: 0,
    explicacion: 'Colombia ganó la Copa América 2001, disputada en su territorio, sin encajar goles.'
  },
  {
    id: 37,
    categoria: 'deportes',
    dificultad: 'medio',
    enunciado: '¿En qué atletismo logró sus principales títulos Caterine Ibargüen?',
    opciones: ['Triple salto', 'Lanzamiento de jabalina', 'Maratón', 'Relevo 4x100'],
    correcta: 0,
    explicacion: 'Caterine Ibargüen es triple salto: campeona olímpica, mundial y de los Juegos Panamericanos.'
  },
  {
    id: 38,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué año Colombia ganó su primera Copa América de fútbol?',
    opciones: ['1947', '1975', '1991', '2001'],
    correcta: 0,
    explicacion: 'Colombia conquistó su primer título continental en la Copa América de 1947, disputada en Ecuador.'
  },
  {
    id: 39,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿Quién fue el primer colombiano en ganar la Vuelta a España?',
    opciones: ['Nairo Quintana', 'Egan Bernal', 'Fabio Parra', 'Luis Herrera'],
    correcta: 0,
    explicacion: 'Nairo Quintana ganó la Vuelta a España en 2016; antes, Fabio Parra había sido tercero en el Tour.'
  },
  {
    id: 40,
    categoria: 'deportes',
    dificultad: 'dificil',
    enunciado: '¿En qué año debutó la selección de Colombia en una Copa del Mundo de fútbol?',
    opciones: ['1962', '1990', '1994', '1958'],
    correcta: 0,
    explicacion: 'Colombia debutó en el Mundial de Chile 1962; su segunda aparición fue en Italia 1990.'
  },

  /* -------------------- CIENCIA Y NATURALEZA ---------------------------- */
  {
    id: 41,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es el ave nacional de Colombia?',
    opciones: ['Cóndor de los Andes', 'Guacamaya bandera', 'Águila arpía', 'Tucán'],
    correcta: 0,
    explicacion: 'El cóndor de los Andes aparece en el escudo nacional y es símbolo del país.'
  },
  {
    id: 42,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cuál es la flor nacional de Colombia?',
    opciones: ['Orquídea', 'Heliconia', 'Frailejón', 'Rosa'],
    correcta: 0,
    explicacion: 'La orquídea (Cattleya trianae) es la flor nacional de Colombia.'
  },
  {
    id: 43,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿Cómo se llama el delfín de agua dulce que habita en la Amazonía colombiana?',
    opciones: ['Delfín rosado', 'Delfín del Río Atrato', 'Orca enana', 'Botella'],
    correcta: 0,
    explicacion: 'El delfín rosado (boto) vive en los ríos de la Amazonía colombiana.'
  },
  {
    id: 44,
    categoria: 'naturaleza',
    dificultad: 'facil',
    enunciado: '¿En qué departamento se encuentra el Parque Nacional Natural Tayrona?',
    opciones: ['Magdalena', 'Cesar', 'La Guajira', 'Chocó'],
    correcta: 0,
    explicacion: 'El Tayrona está en la costa caribe del departamento del Magdalena, cerca de Santa Marta.'
  },
  {
    id: 45,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Cuántas cordilleras atraviesan el territorio colombiano?',
    opciones: ['Tres', 'Dos', 'Cuatro', 'Cinco'],
    correcta: 0,
    explicacion: 'Colombia tiene tres cordilleras: Occidental, Central y Oriental, ramificaciones de los Andes.'
  },
  {
    id: 46,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Cuál es el mamífero terrestre más grande de Colombia?',
    opciones: ['Tapir andino (danta)', 'Oso de anteojos', 'Jaguar', 'Tapir amazónico'],
    correcta: 0,
    explicacion: 'El tapir andino o danta puede pesar más de 250 kilos; es la mayor bestia terrestre del país.'
  },
  {
    id: 47,
    categoria: 'naturaleza',
    dificultad: 'medio',
    enunciado: '¿Cuál es el lago natural más grande de Colombia?',
    opciones: ['Laguna de Tota', 'Laguna de Guatavita', 'Ciénaga Grande', 'Laguna del Cocuy'],
    correcta: 0,
    explicacion: 'La Laguna de Tota, en Boyacá, es el lago natural más extenso del país.'
  },
  {
    id: 48,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Qué país del mundo tiene la mayor diversidad de aves registradas?',
    opciones: ['Colombia', 'Brasil', 'Perú', 'Ecuador'],
    correcta: 0,
    explicacion: 'Colombia encabeza el ranking mundial de aves con más de 1.900 especies registradas.'
  },
  {
    id: 49,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿Por qué mineral precioso es mundialmente famosa Colombia?',
    opciones: ['Esmeraldas', 'Oro', 'Platino', 'Turmalina'],
    correcta: 0,
    explicacion: 'Colombia concentra una gran parte de la producción mundial de esmeraldas de calidad.'
  },
  {
    id: 50,
    categoria: 'naturaleza',
    dificultad: 'dificil',
    enunciado: '¿En qué departamento se encuentra el volcán Galeras, uno de los más activos del país?',
    opciones: ['Nariño', 'Cauca', 'Tolima', 'Caldas'],
    correcta: 0,
    explicacion: 'El Galeras está cerca de Pasto, en Nariño, y es un volcán activo con historial de erupciones.'
  }
];
