'use strict';

/**
 * juego.js
 * Lógica del juego: selección de preguntas, temporizador, validación,
 * comodines y sistema de puntuación (sección 6.1 del documento).
 */

const SEGUNDOS_POR_PREGUNTA = 20;
const TOTAL_PREGUNTAS = 10;
const PUNTOS_CORRECTA = 100;
const BONUS_RAPIDEZ_POR_SEGUNDO = 5;
const BONUS_RAPIDEZ_MAXIMO = 100;
const BONUS_RACHA = 50;
const RACHA_PARA_BONUS = 3;
const PENALIZACION_COMODIN = 30;
const BONUS_TIEMPO = 10;

/** Estado global de la partida actual. */
const estado = {
  jugador: '',
  categoria: 'todas',
  dificultad: 'facil',
  preguntas: [],
  indiceActual: 0,
  aciertos: 0,
  racha: 0,
  puntaje: 0,
  tiempoRestante: SEGUNDOS_POR_PREGUNTA,
  tiempoTotal: 0,
  comodines: { cincuenta: true, tiempo: true },
  bloqueada: false,
  temporizadorId: null,
  falladas: []
};

/* ----------------------------- UTILIDADES ----------------------------- */

/**
 * Ordena un arreglo al azar (algoritmo de Fisher-Yates).
 * @returns {Array} una copia mezclada.
 */
function mezclar(arreglo) {
  const copia = arreglo.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temporal = copia[i];
    copia[i] = copia[j];
    copia[j] = temporal;
  }
  return copia;
}

function multiplicadorDificultad(dificultad) {
  const nivel = DIFICULTADES.find((d) => d.id === dificultad);
  return nivel ? nivel.multiplicador : 1;
}

/**
 * Devuelve una copia de la pregunta con las opciones mezcladas (RF-04)
 * y el índice de la correcta reajustado.
 */
function prepararPregunta(pregunta) {
  const opciones = mezclar(pregunta.opciones);
  return Object.assign({}, pregunta, {
    opciones,
    correcta: opciones.indexOf(pregunta.opciones[pregunta.correcta])
  });
}

/**
 * Filtra el banco por categoría y dificultad, lo mezcla y devuelve
 * hasta 10 preguntas sin repetir (RF-02 y RF-03).
 * Si el filtro no alcanza para 10, se completa con preguntas de la misma
 * categoría y luego con el resto del banco.
 *
 * @param {string} categoria - id de la categoría o 'todas'
 * @param {string} dificultad - 'facil' | 'medio' | 'dificil'
 * @returns {Array} arreglo de preguntas preparadas para la partida
 */
function obtenerPreguntas(categoria, dificultad) {
  const cumpleFiltro = (p) =>
    (categoria === 'todas' || p.categoria === categoria) && p.dificultad === dificultad;

  const principales = PREGUNTAS.filter(cumpleFiltro);
  const mismaCategoria = PREGUNTAS.filter(
    (p) => (categoria === 'todas' || p.categoria === categoria) && p.dificultad !== dificultad
  );
  const resto = PREGUNTAS.filter(
    (p) => !principales.includes(p) && !mismaCategoria.includes(p)
  );

  const seleccion = [].concat(mezclar(principales), mezclar(mismaCategoria), mezclar(resto));
  return seleccion.slice(0, TOTAL_PREGUNTAS).map(prepararPregunta);
}

/* ------------------------------ PARTIDA ------------------------------- */

/**
 * Reinicia el estado, selecciona las preguntas y muestra la primera (RF-03).
 */
function iniciarPartida(categoria, dificultad, jugador) {
  detenerTemporizador();

  estado.jugador = jugador;
  estado.categoria = categoria;
  estado.dificultad = dificultad;
  estado.preguntas = obtenerPreguntas(categoria, dificultad);
  estado.indiceActual = 0;
  estado.aciertos = 0;
  estado.racha = 0;
  estado.puntaje = 0;
  estado.tiempoRestante = SEGUNDOS_POR_PREGUNTA;
  estado.tiempoTotal = 0;
  estado.comodines = { cincuenta: true, tiempo: true };
  estado.bloqueada = false;
  estado.falladas = [];

  mostrarPantalla('pantalla-juego');
  mostrarPregunta(estado);
  iniciarTemporizador();
}

/**
 * Cuenta regresiva de 20 segundos por pregunta (RF-05).
 * Al agotarse el tiempo la pregunta cuenta como incorrecta.
 */
function iniciarTemporizador() {
  detenerTemporizador();
  estado.tiempoRestante = SEGUNDOS_POR_PREGUNTA;
  actualizarTemporizador(estado.tiempoRestante, SEGUNDOS_POR_PREGUNTA);

  estado.temporizadorId = setInterval(() => {
    if (estado.bloqueada) return;

    estado.tiempoRestante -= 1;
    estado.tiempoTotal += 1;
    actualizarTemporizador(Math.max(0, estado.tiempoRestante), SEGUNDOS_POR_PREGUNTA);

    if (estado.tiempoRestante <= 0) {
      responder(-1); /* se agotó el tiempo: incorrecta */
    } else if (estado.tiempoRestante <= 3) {
      reproducirSonido('clic');
    }
  }, 1000);
}

function detenerTemporizador() {
  if (estado.temporizadorId) {
    clearInterval(estado.temporizadorId);
    estado.temporizadorId = null;
  }
}

/**
 * Valida la respuesta, calcula los puntos y actualiza la racha (RF-06 y RF-08).
 * @param {number} indiceOpcion - índice elegido o -1 si se agotó el tiempo
 */
function responder(indiceOpcion) {
  if (estado.bloqueada) return;

  const pregunta = estado.preguntas[estado.indiceActual];
  if (!pregunta) return;

  estado.bloqueada = true;
  detenerTemporizador();

  const esCorrecta = indiceOpcion === pregunta.correcta;
  const segundosRestantes = Math.max(0, estado.tiempoRestante);

  marcarRespuesta(indiceOpcion, pregunta.correcta);
  actualizarComodines(estado);

  let detalle = [];

  if (esCorrecta) {
    /* velocidad + racha + multiplicador (sección 6.1) */
    const bonusRapidez = Math.min(BONUS_RAPIDEZ_MAXIMO, segundosRestantes * BONUS_RAPIDEZ_POR_SEGUNDO);
    let puntosBrutos = PUNTOS_CORRECTA + bonusRapidez;
    if (bonusRapidez > 0) detalle.push('rapidez +' + bonusRapidez);

    estado.racha += 1;
    if (estado.racha % RACHA_PARA_BONUS === 0) {
      puntosBrutos += BONUS_RACHA;
      detalle.push('racha de ' + estado.racha + ' +' + BONUS_RACHA);
    }

    const multiplicador = multiplicadorDificultad(estado.dificultad);
    const ganados = Math.round(puntosBrutos * multiplicador);
    if (multiplicador > 1) detalle.push('x' + multiplicador);

    estado.puntaje += ganados;
    estado.aciertos += 1;

    document.getElementById('puntaje-actual').textContent = estado.puntaje;
    reproducirSonido('acierto');

    mostrarRetroalimentacion({
      correcta: true,
      puntos: ganados,
      detalle: detalle.join(' · '),
      explicacion: pregunta.explicacion,
      ultima: estado.indiceActual === estado.preguntas.length - 1
    });
  } else {
    estado.racha = 0;
    reproducirSonido('error');

    estado.falladas.push({
      enunciado: pregunta.enunciado,
      respuestaJugador: indiceOpcion >= 0 ? pregunta.opciones[indiceOpcion] : '',
      respuestaCorrecta: pregunta.opciones[pregunta.correcta],
      explicacion: pregunta.explicacion
    });

    mostrarRetroalimentacion({
      correcta: false,
      tiempoAgotado: indiceOpcion < 0,
      respuestaJugador: indiceOpcion >= 0 ? pregunta.opciones[indiceOpcion] : '',
      explicacion: pregunta.explicacion,
      respuestaCorrecta: pregunta.opciones[pregunta.correcta],
      ultima: estado.indiceActual === estado.preguntas.length - 1
    });
  }
}

/**
 * Comodines: 50/50 (elimina dos incorrectas) y tiempo extra (+10 s).
 * Cada uso descuenta 30 puntos (puede dejar el marcador en negativo) y
 * solo está disponible una vez por partida.
 */
function usarComodin(tipo) {
  if (estado.bloqueada) return;
  if (tipo === 'cincuenta' && estado.comodines.cincuenta) {
    estado.comodines.cincuenta = false;
    const pregunta = estado.preguntas[estado.indiceActual];
    const incorrectas = pregunta.opciones
      .map((_, i) => i)
      .filter((i) => i !== pregunta.correcta);
    const eliminar = mezclar(incorrectas).slice(0, 2);

    /* se ocultan las dos opciones incorrectas elegidas al azar */
    const mapa = {};
    eliminar.forEach((indice) => { mapa[indice] = true; });
    ocultarOpcionesIncorrectas(pregunta.correcta, mapa);
  } else if (tipo === 'tiempo' && estado.comodines.tiempo) {
    estado.comodines.tiempo = false;
    estado.tiempoRestante += BONUS_TIEMPO;
    actualizarTemporizador(estado.tiempoRestante, SEGUNDOS_POR_PREGUNTA);
  } else {
    return;
  }

  /* todo comodín usado descuenta 30 puntos, incluso si el marcador queda en negativo */
  estado.puntaje -= PENALIZACION_COMODIN;
  document.getElementById('puntaje-actual').textContent = estado.puntaje;
  reproducirSonido('clic');
  actualizarComodines(estado);
}

/**
 * Pasa a la siguiente pregunta o finaliza la partida (RF-11).
 */
function siguientePregunta() {
  ocultarRetroalimentacion();
  estado.indiceActual += 1;
  estado.bloqueada = false;

  if (estado.indiceActual >= estado.preguntas.length) {
    finalizarPartida();
    return;
  }

  mostrarPregunta(estado);
  iniciarTemporizador();
}

/**
 * Calcula el resumen, guarda el ranking y las estadísticas y muestra el resultado.
 */
function finalizarPartida() {
  detenerTemporizador();

  const resumen = {
    nombre: estado.jugador,
    puntaje: estado.puntaje,
    aciertos: estado.aciertos,
    preguntas: estado.preguntas.length,
    tiempoTotal: estado.tiempoTotal,
    categoria: estado.categoria,
    dificultad: estado.dificultad,
    falladas: estado.falladas,
    fecha: new Date().toISOString()
  };

  resumen.posicion = guardarEnRanking(resumen);
  actualizarEstadisticas(resumen);

  reproducirSonido('final');
  mostrarResultado(resumen);
}
