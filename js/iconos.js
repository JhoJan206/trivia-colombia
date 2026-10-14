'use strict';

/**
 * iconos.js
 * Colección de iconos SVG en línea (trazo) usados en la interfaz.
 * Sustituyen a los emojis para lograr un aspecto uniforme y escalable.
 *
 * Cada icono se dibuja sobre un lienzo de 24x24, sin relleno, con trazo de
 * color heredado (currentColor) para adaptarse al tema claro/oscuro.
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
    '<path d="m22 9-6 6"/><path d="m16 9 6 6"/>'
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
