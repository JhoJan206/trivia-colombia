'use strict';

/**
 * iconos.js
 * Colección de iconos SVG en línea usados en la interfaz.
 * Sustituyen a los emojis para lograr un aspecto uniforme y escalable.
 *
 * Hay dos familias:
 *  - ICONOS: iconos de trazo sobre un lienzo de 24x24, sin relleno y con
 *    color heredado (currentColor). Se usan en botones y controles.
 *  - ILUSTRACIONES: dibujos a color sobre un lienzo de 64x64, con rellenos
 *    y contorno, para las tarjetas de categoría y de dificultad. Todos los
 *    colores salen de variables CSS (--ico-*), de modo que un mismo dibujo
 *    se ve bien en tema claro y oscuro.
 */

const ICONOS = {
  /* ------------------------------ Categorías ---------------------------- */
  dados:
    '<rect width="18" height="18" x="3" y="3" rx="2"/>' +
    '<path d="M16 8h.01"/><path d="M8 8h.01"/><path d="M8 16h.01"/>' +
    '<path d="M16 16h.01"/><path d="M12 12h.01"/>',
  mapa:
    '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/>' +
    '<path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  pergamino:
    '<path d="M15 12h-5"/><path d="M15 8h-5"/>' +
    '<path d="M19 17V5a2 2 0 0 0-2-2H4"/>' +
    '<path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>',
  mascaras:
    '<path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/>' +
    '<path d="M6.5 13.1h.01"/>' +
    '<path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/>' +
    '<path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/>' +
    '<path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/>' +
    '<path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/>',
  balon:
    '<circle cx="12" cy="12" r="10"/>' +
    '<polygon points="12,8 15.8,10.8 14.35,15.24 9.65,15.24 8.2,10.8"/>' +
    '<path d="M12 8V2"/><path d="M15.8 10.8 21.5 8.9"/>' +
    '<path d="M14.35 15.24 17.88 20.09"/><path d="M9.65 15.24 6.12 20.09"/>' +
    '<path d="M8.2 10.8 2.5 8.9"/>',
  hoja:
    '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>' +
    '<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',

  /* ------------------------------ Dificultad ---------------------------- */
  sonrisa:
    '<circle cx="12" cy="12" r="10"/>' +
    '<path d="M8 14s1.5 2 4 2 4-2 4-2"/>' +
    '<path d="M9 9h.01"/><path d="M15 9h.01"/>',
  duda:
    '<circle cx="12" cy="12" r="10"/>' +
    '<path d="M8 15h8"/>' +
    '<path d="M9 9h.01"/><path d="M15 9h.01"/>',
  dificultad:
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',

  /* ----------------------------- Preferencias --------------------------- */
  sol:
    '<circle cx="12" cy="12" r="4"/>' +
    '<path d="M12 2v2"/><path d="M12 20v2"/>' +
    '<path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/>' +
    '<path d="M2 12h2"/><path d="M20 12h2"/>' +
    '<path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  luna:
    '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sonido:
    '<path d="M11 5 6 9H2v6h4l5 4V5z"/>' +
    '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>' +
    '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
  silencio:
    '<path d="M11 5 6 9H2v6h4l5 4V5z"/>' +
    '<path d="m22 9-6 6"/><path d="m16 9 6 6"/>',

  /* --------------------- Símbolos colombianos --------------------------- */
  /* Paisaje andino (Geografía). */
  montanas:
    '<path d="M3 19h18L14.2 6.2 10.6 13 8.6 9.8Z"/>' +
    '<path d="m12.2 9.2 1.9 3.1"/>',
  /* Mochila arhuaca (Cultura y tradiciones). */
  mochila:
    '<rect x="5" y="7" width="14" height="14" rx="3"/>' +
    '<path d="M9 7V5a3 3 0 0 1 6 0v2"/>' +
    '<path d="M9 12h6v4H9z"/>',
  /* Orquídea, flor nacional (Ciencia y naturaleza). */
  orquidea:
    '<circle cx="12" cy="12" r="2.2"/>' +
    '<circle cx="12" cy="4" r="2"/><circle cx="19.6" cy="8.5" r="2"/>' +
    '<circle cx="16.7" cy="17.5" r="2"/><circle cx="7.3" cy="17.5" r="2"/>' +
    '<circle cx="4.4" cy="8.5" r="2"/>' +
    '<path d="M12 9.8V6"/><path d="m13.8 10.9 3.4-1.3"/><path d="m13.1 13.7 2.3 2.6"/>' +
    '<path d="m10.9 13.7-2.3 2.6"/><path d="m10.2 10.9-3.4-1.3"/>',
  /* Sombrero vueltiao (símbolo nacional, categoría "Todas"). */
  sombrero:
    '<ellipse cx="12" cy="14" rx="10" ry="3.6"/>' +
    '<path d="M6.4 14C7 9 9 6 12 6s5 3 5.6 8"/>' +
    '<path d="M8 11.4h8"/>',

  /* --------------------- Dificultad: granos de café --------------------- */
  cafe1:
    '<ellipse cx="12" cy="12" rx="4" ry="6.4"/>' +
    '<path d="M12 5.6c-1.6 2-1.6 10.8 0 12.8"/>',
  cafe2:
    '<ellipse cx="7.2" cy="12" rx="3" ry="5.2"/>' +
    '<path d="M7.2 6.8c-1.2 1.7-1.2 8.7 0 10.4"/>' +
    '<ellipse cx="16.8" cy="12" rx="3" ry="5.2"/>' +
    '<path d="M16.8 6.8c-1.2 1.7-1.2 8.7 0 10.4"/>',
  cafe3:
    '<ellipse cx="4.2" cy="12" rx="2.3" ry="4.2"/>' +
    '<path d="M4.2 7.8c-1 1.5-1 6.9 0 8.4"/>' +
    '<ellipse cx="12" cy="12" rx="2.3" ry="4.2"/>' +
    '<path d="M12 7.8c-1 1.5-1 6.9 0 8.4"/>' +
    '<ellipse cx="19.8" cy="12" rx="2.3" ry="4.2"/>' +
    '<path d="M19.8 7.8c-1 1.5-1 6.9 0 8.4"/>'
};

/* =======================================================================
   ILUSTRACIONES a color (lienzo 64x64) para las tarjetas de selección.
   Solo contienen las formas; el contenedor <svg> lo añade ilustracionSVG().
   Colores: variables --ico-* definidas en css/styles.css para cada tema.
   ======================================================================= */

const ILUSTRACIONES = {
  /* ------------------------------ Categorías ---------------------------- */
  /* Geografía: tres cordilleras en capas, picos nevados y sol. */
  montanas:
    '<circle cx="48" cy="13" r="10.5" fill="var(--ico-amarillo)" stroke="none" opacity="0.3"/>' +
    '<circle cx="48" cy="13" r="6.5" fill="var(--ico-amarillo)"/>' +
    '<path d="M0 64 L0 40 L14 21 L26 37 L38 18 L52 40 L64 28 L64 64 Z" fill="var(--ico-azul)"/>' +
    '<path d="M33.5 24 L38 18 L42.5 24 L40 22 L38 23.5 L36 22 Z" fill="var(--ico-nieve)"/>' +
    '<path d="M10.5 26 L14 21 L17.5 26 L15.5 24.5 L14 25.5 L12.5 24.5 Z" fill="var(--ico-nieve)"/>' +
    '<path d="M0 64 L0 48 L12 36 L24 50 L34 38 L46 52 L56 44 L64 52 L64 64 Z" fill="var(--ico-azul-claro)"/>' +
    '<path d="M0 64 L0 56 L10 48 L20 56 L30 47 L40 57 L50 50 L60 58 L64 55 L64 64 Z" fill="var(--ico-verde)"/>',

  /* Historia: pergamino con renglones escritos, listón y sello de lacre. */
  pergamino:
    '<rect x="12" y="6" width="40" height="9" rx="4.5" fill="var(--ico-pergamino-2)"/>' +
    '<rect x="12" y="49" width="40" height="9" rx="4.5" fill="var(--ico-pergamino-2)"/>' +
    '<rect x="17" y="10" width="30" height="44" fill="var(--ico-pergamino)"/>' +
    '<rect x="24" y="17" width="16" height="2.4" rx="1.2" fill="var(--ico-pergamino-linea)"/>' +
    '<rect x="24" y="22" width="12" height="2.4" rx="1.2" fill="var(--ico-pergamino-linea)"/>' +
    '<rect x="24" y="27" width="16" height="2.4" rx="1.2" fill="var(--ico-pergamino-linea)"/>' +
    '<path d="M28 36 L25 48 L32 44 L39 48 L36 36 Z" fill="var(--ico-rojo)"/>' +
    '<circle cx="32" cy="34" r="6.5" fill="var(--ico-rojo)"/>' +
    '<circle cx="32" cy="34" r="2.8" fill="var(--ico-amarillo)"/>',

  /* Cultura y tradiciones: mochila arhuaca con franjas y rombos tejidos. */
  mochila:
    '<path d="M21 22 C21 9 43 9 43 22" fill="none" stroke-width="2.4"/>' +
    '<rect x="15" y="20" width="34" height="41" rx="7" fill="var(--ico-arena)"/>' +
    '<rect x="17.5" y="27" width="29" height="7" fill="var(--ico-rojo)"/>' +
    '<rect x="17.5" y="45" width="29" height="7" fill="var(--ico-rojo)"/>' +
    '<path d="M21 34 L25 39 L21 44 L17 39 Z" fill="var(--ico-contorno)"/>' +
    '<path d="M28 34 L32 39 L28 44 L24 39 Z" fill="var(--ico-contorno)"/>' +
    '<path d="M35 34 L39 39 L35 44 L31 39 Z" fill="var(--ico-contorno)"/>' +
    '<path d="M42 34 L46 39 L42 44 L38 39 Z" fill="var(--ico-contorno)"/>',

  /* Deportes: balón con franjas tricolor y base verde. */
  balon:
    '<ellipse cx="32" cy="57" rx="15" ry="3.5" fill="var(--ico-verde)"/>' +
    '<path d="M32 29 L32 12 A17 17 0 0 1 46.7 37.5 Z" fill="var(--ico-amarillo)"/>' +
    '<path d="M32 29 L46.7 37.5 A17 17 0 0 1 17.3 37.5 Z" fill="var(--ico-azul)"/>' +
    '<path d="M32 29 L17.3 37.5 A17 17 0 0 1 32 12 Z" fill="var(--ico-rojo)"/>' +
    '<circle cx="25" cy="21" r="3.6" fill="var(--ico-nieve)" stroke="none" opacity="0.75"/>',

  /* Ciencia y naturaleza: orquídea, flor nacional (Cattleya trianae). */
  orquidea:
    '<rect x="30.7" y="34" width="2.6" height="28" rx="1.3" fill="var(--ico-verde)"/>' +
    '<path d="M32 58 C23 56 19 50 19 43 C27 45 32 51 32 58 Z" fill="var(--ico-verde)"/>' +
    '<path d="M32 58 C41 56 45 50 45 43 C37 45 32 51 32 58 Z" fill="var(--ico-verde)"/>' +
    '<ellipse cx="32" cy="15" rx="5.5" ry="9" fill="var(--ico-magenta)"/>' +
    '<ellipse cx="22" cy="21" rx="5.5" ry="9" transform="rotate(-60 22 21)" fill="var(--ico-magenta)"/>' +
    '<ellipse cx="42" cy="21" rx="5.5" ry="9" transform="rotate(60 42 21)" fill="var(--ico-magenta)"/>' +
    '<ellipse cx="24" cy="35" rx="5.5" ry="9" transform="rotate(-120 24 35)" fill="var(--ico-magenta)"/>' +
    '<ellipse cx="40" cy="35" rx="5.5" ry="9" transform="rotate(120 40 35)" fill="var(--ico-magenta)"/>' +
    '<ellipse cx="32" cy="34" rx="5" ry="6.5" fill="var(--ico-violeta)"/>' +
    '<circle cx="32" cy="26" r="4.6" fill="var(--ico-amarillo)"/>' +
    '<circle cx="30.3" cy="25.2" r="1" fill="var(--ico-violeta)" stroke="none"/>' +
    '<circle cx="33.6" cy="25.6" r="1" fill="var(--ico-violeta)" stroke="none"/>' +
    '<circle cx="32" cy="27.6" r="1" fill="var(--ico-violeta)" stroke="none"/>',

  /* "Todas": sombrero vueltiao con tejido y cinta tricolor. */
  sombrero:
    '<ellipse cx="32" cy="43" rx="28" ry="12" fill="var(--ico-arena)"/>' +
    '<ellipse cx="32" cy="43" rx="21" ry="8.6" fill="none" stroke-width="1.8"/>' +
    '<ellipse cx="32" cy="43" rx="13.5" ry="5.6" fill="none" stroke-width="1.8"/>' +
    '<path d="M20 43 C20 21 24 13 32 13 C40 13 44 21 44 43 Z" fill="var(--ico-arena)"/>' +
    '<rect x="21" y="36.4" width="22" height="1.7" fill="var(--ico-amarillo)"/>' +
    '<rect x="21" y="38.4" width="22" height="1.7" fill="var(--ico-azul)"/>' +
    '<rect x="21" y="40.4" width="22" height="1.7" fill="var(--ico-rojo)"/>' +
    '<path d="M23 30 C26.5 28.4 37.5 28.4 41 30" fill="none" stroke-width="1.8"/>' +
    '<path d="M22.5 22 C26.5 20.4 37.5 20.4 41.5 22" fill="none" stroke-width="1.8"/>',

  /* --------------------- Dificultad: granos de café --------------------- */
  /* Fácil: un grano. */
  cafe1:
    '<path d="M32 16 C29 8 33 3 40 3 C41 9 38 15 32 16 Z" fill="var(--ico-verde)"/>' +
    '<ellipse cx="32" cy="33" rx="10.5" ry="13.5" fill="var(--ico-cafe)"/>' +
    '<path d="M32 20.5 C28.5 26 28.5 40 32 45.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="2.2"/>',

  /* Medio: dos granos. */
  cafe2:
    '<path d="M32 17 C30 10 33 6 39 6 C40 11 37 16 32 17 Z" fill="var(--ico-verde)"/>' +
    '<ellipse cx="20" cy="33" rx="7.6" ry="12" fill="var(--ico-cafe)"/>' +
    '<ellipse cx="44" cy="33" rx="7.6" ry="12" fill="var(--ico-cafe)"/>' +
    '<path d="M20 21.5 C17.5 26 17.5 40 20 44.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="2"/>' +
    '<path d="M44 21.5 C41.5 26 41.5 40 44 44.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="2"/>',

  /* Difícil: tres granos. */
  cafe3:
    '<path d="M32 16 C30 9 33 5 39 5 C40 10 37 15 32 16 Z" fill="var(--ico-verde)"/>' +
    '<ellipse cx="13" cy="34" rx="7" ry="10.5" fill="var(--ico-cafe)"/>' +
    '<ellipse cx="32" cy="34" rx="7" ry="10.5" fill="var(--ico-cafe)"/>' +
    '<ellipse cx="51" cy="34" rx="7" ry="10.5" fill="var(--ico-cafe)"/>' +
    '<path d="M13 23.5 C11 27.5 11 40.5 13 44.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="1.9"/>' +
    '<path d="M32 23.5 C30 27.5 30 40.5 32 44.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="1.9"/>' +
    '<path d="M51 23.5 C49 27.5 49 40.5 51 44.5" fill="none" stroke="var(--ico-cafe-2)" stroke-width="1.9"/>',

  /* --------- Retroalimentación del modal (se dibujan más grandes) -------- */
  /* Respuesta correcta: medalla tricolor con chulo y confeti alrededor. */
  retroCorrecta:
    '<circle cx="8" cy="10" r="3" fill="var(--ico-amarillo)"/>' +
    '<rect x="53" y="6" width="5" height="5" rx="1" transform="rotate(20 55.5 8.5)" fill="var(--ico-azul)"/>' +
    '<circle cx="57" cy="52" r="3" fill="var(--ico-rojo)"/>' +
    '<rect x="4" y="50" width="5" height="5" rx="1" transform="rotate(-15 6.5 52.5)" fill="var(--ico-verde)"/>' +
    '<circle cx="32" cy="32" r="26" fill="var(--ico-amarillo)"/>' +
    '<circle cx="32" cy="32" r="21" fill="var(--ico-azul)"/>' +
    '<circle cx="32" cy="32" r="16.5" fill="var(--ico-nieve)"/>' +
    '<path d="M19.1 34.5 L22.6 31 L31.1 39.4 L41.2 20.7 L45.2 23.7 L27.5 42.9 Z" fill="var(--ico-verde)"/>',

  /* Respuesta incorrecta: equis roja dentro de un disco blanco con marco rojo. */
  retroIncorrecta:
    '<circle cx="32" cy="32" r="26" fill="var(--ico-rojo)"/>' +
    '<circle cx="32" cy="32" r="20.5" fill="var(--ico-nieve)"/>' +
    '<path d="M26.5 15 L37.5 15 L37.5 26.5 L49 26.5 L49 37.5 L37.5 37.5 L37.5 49 L26.5 49 L26.5 37.5 L15 37.5 L15 26.5 L26.5 26.5 Z" fill="var(--ico-rojo)" transform="rotate(45 32 32)"/>',

  /* Tiempo agotado: reloj despertador tricolor. */
  retroTiempo:
    '<circle cx="15" cy="17" r="7.5" fill="var(--ico-rojo)"/>' +
    '<circle cx="49" cy="17" r="7.5" fill="var(--ico-rojo)"/>' +
    '<rect x="28.5" y="6" width="7" height="7" rx="2.5" fill="var(--ico-rojo)"/>' +
    '<circle cx="32" cy="34" r="21" fill="var(--ico-amarillo)"/>' +
    '<circle cx="32" cy="34" r="16.5" fill="var(--ico-nieve)"/>' +
    '<rect x="30.6" y="20" width="2.8" height="6" rx="1.4" fill="var(--ico-azul)"/>' +
    '<rect x="41.5" y="32.6" width="6" height="2.8" rx="1.4" fill="var(--ico-azul)"/>' +
    '<rect x="30.6" y="42" width="2.8" height="6" rx="1.4" fill="var(--ico-azul)"/>' +
    '<rect x="16.5" y="32.6" width="6" height="2.8" rx="1.4" fill="var(--ico-azul)"/>' +
    '<rect x="30.6" y="26" width="2.8" height="8" rx="1.4" fill="var(--ico-rojo)" transform="rotate(-60 32 34)"/>' +
    '<rect x="30.6" y="22" width="2.8" height="12" rx="1.4" fill="var(--ico-rojo)" transform="rotate(60 32 34)"/>' +
    '<circle cx="32" cy="34" r="2.2" fill="var(--ico-contorno)"/>'
};

/**
 * Devuelve el marcado SVG de un icono por su nombre.
 * @param {string} nombre - clave dentro de ICONOS.
 * @returns {string} SVG en línea (vacío si el nombre no existe).
 */
function iconoSVG(nombre) {
  const dibujo = ICONOS[nombre];
  if (!dibujo) return '';
  return (
    '<svg class="icono-svg" viewBox="0 0 24 24" width="1em" height="1em" ' +
    'fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + dibujo + '</svg>'
  );
}

/**
 * Devuelve el marcado SVG de una ilustración a color por su nombre.
 * El contorno (--ico-contorno) es lo que garantiza que el dibujo se
 * distinga tanto sobre tarjeta clara como oscura.
 * Si el nombre no existe en ILUSTRACIONES se usa el icono de trazo
 * equivalente, para que la interfaz nunca quede sin imagen.
 * @param {string} nombre - clave dentro de ILUSTRACIONES.
 * @returns {string} SVG en línea.
 */
function ilustracionSVG(nombre) {
  const dibujo = ILUSTRACIONES[nombre];
  if (!dibujo) return iconoSVG(nombre);
  return (
    '<svg class="ilustracion-svg" viewBox="0 0 64 64" width="1em" height="1em" ' +
    'stroke="var(--ico-contorno)" stroke-width="1.6" ' +
    'stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true" focusable="false">' + dibujo + '</svg>'
  );
}
