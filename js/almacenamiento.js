'use strict';

/**
 * almacenamiento.js
 * Ranking, estadísticas y preferencias del jugador en localStorage.
 *
 * Claves utilizadas:
 *   trivia_ranking -> [{ nombre, puntaje, categoria, dificultad, fecha }]
 *   trivia_stats   -> { partidas, aciertos, preguntas, mejorPuntaje, categorias: { id: { aciertos, preguntas } } }
 *   trivia_prefs   -> { tema, sonido, nombre }
 */

const CLAVE_RANKING = 'trivia_ranking';
const CLAVE_STATS = 'trivia_stats';
const CLAVE_PREFS = 'trivia_prefs';

const TAMANO_RANKING = 10;

/* ------------------------- utilidades internas ------------------------- */

function leerJSON(clave, valorPorDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    if (!crudo) return valorPorDefecto;
    const dato = JSON.parse(crudo);
    return dato === null || dato === undefined ? valorPorDefecto : dato;
  } catch (error) {
    console.warn('No se pudo leer la clave «' + clave + '» de localStorage:', error);
    return valorPorDefecto;
  }
}

function escribirJSON(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.warn('No se pudo guardar la clave «' + clave + '» en localStorage:', error);
    return false;
  }
}

/* ------------------------------- RANKING ------------------------------- */

function obtenerRanking() {
  const ranking = leerJSON(CLAVE_RANKING, []);
  return Array.isArray(ranking) ? ranking : [];
}

/**
 * Guarda el resultado de una partida, ordena el ranking de mayor a menor
 * y conserva únicamente el top 10 (RF-12 y RF-13).
 * @returns {number} posición (1-10) que ocupó la partida, o -1 si no entró.
 */
function guardarEnRanking(partida) {
  const ranking = obtenerRanking();
  ranking.push({
    nombre: partida.nombre,
    puntaje: partida.puntaje,
    categoria: partida.categoria,
    dificultad: partida.dificultad,
    fecha: partida.fecha || new Date().toISOString()
  });

  ranking.sort((a, b) => b.puntaje - a.puntaje);

  const recortado = ranking.slice(0, TAMANO_RANKING);
  escribirJSON(CLAVE_RANKING, recortado);

  const posicion = recortado.findIndex(
    (item) => item.nombre === partida.nombre && item.puntaje === partida.puntaje && item.fecha === (partida.fecha || item.fecha)
  );
  return posicion >= 0 ? posicion + 1 : -1;
}

function borrarRanking() {
  try {
    localStorage.removeItem(CLAVE_RANKING);
    return true;
  } catch (error) {
    console.warn('No se pudo borrar el ranking:', error);
    return false;
  }
}

/**
 * Mejor puntaje de un jugador en una combinación categoría + dificultad.
 */
function mejorPuntajeCombinacion(nombre, categoria, dificultad) {
  const ranking = obtenerRanking();
  const puntajes = ranking
    .filter((p) => p.nombre === nombre && p.categoria === categoria && p.dificultad === dificultad)
    .map((p) => p.puntaje);
  return puntajes.length ? Math.max.apply(null, puntajes) : 0;
}

/* ----------------------------- ESTADÍSTICAS ---------------------------- */

function estadisticasVacias() {
  return {
    partidas: 0,
    aciertos: 0,
    preguntas: 0,
    mejorPuntaje: 0,
    categorias: {}
  };
}

function obtenerEstadisticas() {
  const stats = leerJSON(CLAVE_STATS, estadisticasVacias());
  if (!stats || typeof stats !== 'object') return estadisticasVacias();
  return Object.assign(estadisticasVacias(), stats, {
    categorias: stats.categorias && typeof stats.categorias === 'object' ? stats.categorias : {}
  });
}

/**
 * Acumula los datos de una partida terminada (RF-12).
 * @param {{puntaje:number, aciertos:number, preguntas:number, categoria:string}} partida
 */
function actualizarEstadisticas(partida) {
  const stats = obtenerEstadisticas();

  stats.partidas += 1;
  stats.aciertos += partida.aciertos;
  stats.preguntas += partida.preguntas;
  stats.mejorPuntaje = Math.max(stats.mejorPuntaje, partida.puntaje);

  const cat = partida.categoria;
  if (cat) {
    if (!stats.categorias[cat]) stats.categorias[cat] = { aciertos: 0, preguntas: 0 };
    stats.categorias[cat].aciertos += partida.aciertos;
    stats.categorias[cat].preguntas += partida.preguntas;
  }

  escribirJSON(CLAVE_STATS, stats);
  return stats;
}

/**
 * Porcentaje global de aciertos del jugador.
 */
function porcentajeAciertos(stats) {
  if (!stats || !stats.preguntas) return 0;
  return Math.round((stats.aciertos / stats.preguntas) * 100);
}

/**
 * Categoría con mejor desempeño (mayor porcentaje de aciertos).
 * @returns {{id:string, nombre:string, porcentaje:number}|null}
 */
function categoriaConMejorDesempeno(stats) {
  if (!stats || !stats.categorias) return null;

  let mejor = null;
  Object.keys(stats.categorias).forEach((id) => {
    const dato = stats.categorias[id];
    if (!dato.preguntas) return;
    const porcentaje = Math.round((dato.aciertos / dato.preguntas) * 100);
    if (!mejor || porcentaje > mejor.porcentaje) {
      const categoria = CATEGORIAS.find((c) => c.id === id);
      mejor = { id, nombre: categoria ? categoria.nombre : id, porcentaje };
    }
  });
  return mejor;
}

function borrarEstadisticas() {
  try {
    localStorage.removeItem(CLAVE_STATS);
    return true;
  } catch (error) {
    console.warn('No se pudieron borrar las estadísticas:', error);
    return false;
  }
}

/* ---------------------------- PREFERENCIAS ----------------------------- */

function obtenerPreferencias() {
  const prefs = leerJSON(CLAVE_PREFS, {});
  return Object.assign({ tema: 'claro', sonido: true, nombre: '' }, prefs || {});
}

function guardarPreferencias(parciales) {
  const prefs = Object.assign(obtenerPreferencias(), parciales);
  escribirJSON(CLAVE_PREFS, prefs);
  return prefs;
}
