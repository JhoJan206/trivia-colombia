# Trivia Colombia

proyecto creado como pracila para la calse de "Desarrollo Full Stack Con IA", este es un Juego web educativo de preguntas sobre la geografía, la historia, la cultura, los deportes y la naturaleza de Colombia. Construido con **HTML5, CSS3 y JavaScript (ES6+)**, sin dependencias ni frameworks: se ejecuta directamente en el navegador y guarda el ranking en `localStorage`.

## Funcionalidades

- Pantallas: Inicio, Instrucciones, Configuración de partida, Juego, Retroalimentación, Resultado y Ranking/Estadísticas.
- Identificación del jugador solo con su nombre (sin registro ni servidor).
- 5 categorías + «Todas» y 3 niveles de dificultad (fácil, medio, difícil).
- Rondas de 10 preguntas seleccionadas al azar y sin repetir; opciones mezcladas (Fisher-Yates).
- Temporizador de 20 segundos por pregunta con barra de progreso circular.
- Comodines **50/50** y **+10 s**, uno de cada uno por partida (−30 puntos cada uno; el puntaje puede quedar en negativo).
- Retroalimentación inmediata: opción correcta en verde, incorrecta en rojo y explicación breve.
- Sistema de puntuación con bonificación por rapidez, racha y multiplicador por dificultad.
- Revisión de las preguntas falladas al finalizar la partida.
- Ranking local Top 10 y estadísticas (partidas, % de aciertos, mejor puntaje, mejor categoría).
- Tema claro/oscuro, sonido activable/desactivable y preferencias guardadas.
- Responsive de 360 px a escritorio, accesible por teclado y con `prefers-reduced-motion`.

## Estructura

```
trivia-colombia/
├── index.html            Estructura semántica de todas las pantallas
├── css/
│   ├── styles.css        Variables, tema claro/oscuro y componentes
│   └── responsive.css    Media queries (360 px → escritorio)
├── js/
│   ├── app.js            Punto de entrada y navegación
│   ├── juego.js          Lógica: preguntas, tiempo, puntaje, comodines
│   ├── preguntas.js      Banco de 50 preguntas y catálogos de datos
│   ├── iconos.js         Íconos SVG en línea (categorías, dificultad y controles)
│   ├── ui.js             Renderizado de pantallas en el DOM
│   └── almacenamiento.js Ranking, estadísticas y preferencias (localStorage)
├── assets/
│   ├── img/logo.svg      Logotipo
│   └── sonidos/          Efectos de acierto, error, clic y fin de partida
├── docs/
│   └── diseno/           Diseño de la interfaz (capturas de las pantallas)
└── README.md
```

## Ejecución local

1. Clonar o descargar el repositorio.
2. Abrir el `index.html` directamente en el navegador, ya que no hay peticiones de red.

## Despliegue en Vercel

vercel: [Web desplegada en vercel](https://trivia-colombia-iota.vercel.app/)

## Reglas y puntuación

| Concepto | Puntos |
| --- | --- |
| Respuesta correcta | +100 |
| Bonificación por rapidez | +5 por segundo restante (máx. +100) |
| Racha de 3 aciertos seguidos | +50 |
| Respuesta incorrecta o sin responder | 0 |
| Uso de un comodín | −30 |
| Multiplicador (fácil / medio / difícil) | ×1 / ×1.5 / ×2 |

## Banco de preguntas

`js/preguntas.js` contiene **50 preguntas** (10 por categoría) con enunciado, 4 opciones, respuesta correcta, explicación y nivel. Si el filtro de categoría + dificultad no alcanza para 10 preguntas, la partida se completa con preguntas de la misma categoría y luego con el resto del banco, sin repetir.

## Almacenamiento local (localStorage)

| Clave | Contenido |
| --- | --- |
| `trivia_ranking` | `[{ nombre, puntaje, categoria, dificultad, fecha }]` (top 10) |
| `trivia_stats` | Partidas, aciertos, preguntas, mejor puntaje y desempeño por categoría |
| `trivia_prefs` | Tema, sonido y último nombre del jugador |

No hay servidor, API ni base de datos: el ranking es local al dispositivo.

## Tecnologías

HTML5 semántico · CSS3 (variables, Flexbox, Grid, media queries, animaciones) · JavaScript ES6+ · localStorage · Git/GitHub · Vercel.