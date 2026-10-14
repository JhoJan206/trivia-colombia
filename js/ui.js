'use strict';

/**
 * ui.js
 * Renderizado de todas las pantallas del juego en el DOM.
 * Solo manipula la interfaz; la lógica vive en juego.js y app.js.
 */

const LETRAS = ['A', 'B', 'C', 'D'];

/* ------------------------------- SONIDO ------------------------------- */

const SONIDOS = {
  acierto: 'assets/sonidos/acierto.wav',
  error: 'assets/sonidos/error.wav',
  clic: 'assets/sonidos/clic.wav',
  final: 'assets/sonidos/final.wav'
};

let audioHabilitado = true;

function reproducirSonido(tipo) {
  if (!audioHabilitado || !SONIDOS[tipo]) return;
  try {
    const audio = new Audio(SONIDOS[tipo]);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (error) {
    /* el navegador bloqueó la reproducción: se ignora */
  }
}

function establecerSonido(activo) {
  audioHabilitado = Boolean(activo);
}

/* ---------------------------- NAVEGACIÓN ------------------------------ */

/**
 * Muestra una pantalla y oculta las demás.
 * @param {string} idPantalla - id de la <section> a mostrar.
 */
function mostrarPantalla(idPantalla) {
  const pantallas = document.querySelectorAll('.pantalla');
  pantallas.forEach((pantalla) => {
    const activa = pantalla.id === idPantalla;
    pantalla.classList.toggle('activa', activa);
    pantalla.setAttribute('aria-hidden', activa ? 'false' : 'true');
  });

  const destino = document.getElementById(idPantalla);
  if (destino) {
    destino.classList.remove('animar');
    void destino.offsetWidth; /* reinicia la animación de entrada */
    destino.classList.add('animar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const foco = destino.querySelector('h1, h2, input, button');
    if (foco && typeof foco.focus === 'function') foco.focus({ preventScroll: true });
  }
}

/* -------------------------- CONFIGURACIÓN ----------------------------- */

/**
 * Tarjetas de categoría y botones de dificultad en la pantalla de configuración.
 */
function renderConfiguracion() {
  const contenedorCategorias = document.getElementById('contenedor-categorias');
  contenedorCategorias.innerHTML = '';

  CATEGORIAS.forEach((categoria) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'tarjeta-seleccion';
    boton.dataset.categoria = categoria.id;
    boton.setAttribute('aria-pressed', 'false');
    boton.innerHTML =
      '<span class="tarjeta-seleccion-icono" aria-hidden="true">' + ilustracionSVG(categoria.icono) + '</span>' +
      '<span class="tarjeta-seleccion-nombre">' + categoria.nombre + '</span>';
    contenedorCategorias.appendChild(boton);
  });

  const contenedorDificultades = document.getElementById('contenedor-dificultades');
  contenedorDificultades.innerHTML = '';

  DIFICULTADES.forEach((dificultad) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'tarjeta-seleccion';
    boton.dataset.dificultad = dificultad.id;
    boton.setAttribute('aria-pressed', 'false');
    boton.innerHTML =
      '<span class="tarjeta-seleccion-icono" aria-hidden="true">' + ilustracionSVG(dificultad.icono) + '</span>' +
      '<span class="tarjeta-seleccion-nombre">' + dificultad.nombre + '</span>' +
      '<span class="tarjeta-seleccion-extra">x' + dificultad.multiplicador + '</span>';
    contenedorDificultades.appendChild(boton);
  });
}

/**
 * Marca la categoría y la dificultad activas y actualiza el mejor puntaje.
 */
function marcarSeleccion(estado) {
  document.querySelectorAll('[data-categoria]').forEach((boton) => {
    const activo = boton.dataset.categoria === estado.categoria;
    boton.classList.toggle('seleccionada', activo);
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
  });

  document.querySelectorAll('[data-dificultad]').forEach((boton) => {
    const activo = boton.dataset.dificultad === estado.dificultad;
    boton.classList.toggle('seleccionada', activo);
    boton.setAttribute('aria-pressed', activo ? 'true' : 'false');
  });

  const nombre = estado.jugador ? estado.jugador.trim() : '';
  const nombreConfig = document.getElementById('nombre-config');
  if (nombreConfig) nombreConfig.textContent = nombre || 'jugador';

  const mejor = nombre ? mejorPuntajeCombinacion(nombre, estado.categoria, estado.dificultad) : 0;
  const elemento = document.getElementById('mejor-puntaje');
  elemento.textContent = 'Mejor puntaje de ' + (nombre || 'jugador') + ' en esta combinación: ' + mejor;
}

/* ------------------------------- JUEGO -------------------------------- */

/**
 * Dibuja la pregunta actual: enunciado, opciones, progreso, puntaje y comodines.
 * @param {object} estado - estado de la partida (juego.js)
 */
function mostrarPregunta(estado) {
  const pregunta = estado.preguntas[estado.indiceActual];
  if (!pregunta) return;

  const categoria = CATEGORIAS.find((c) => c.id === pregunta.categoria);
  const dificultad = DIFICULTADES.find((d) => d.id === pregunta.dificultad);

  document.getElementById('etiqueta-pregunta').textContent =
    (categoria ? categoria.nombre : '') + ' · ' + (dificultad ? dificultad.nombre : '');

  document.getElementById('enunciado').textContent = pregunta.enunciado;

  /* progreso: barra + texto (RF-10) */
  const total = estado.preguntas.length;
  const actual = estado.indiceActual + 1;
  document.getElementById('texto-progreso').textContent = 'Pregunta ' + actual + ' de ' + total;
  document.getElementById('barra-progreso').style.width = (actual / total) * 100 + '%';

  document.getElementById('puntaje-actual').textContent = estado.puntaje;

  /* opciones mezcladas (RF-04) */
  const contenedor = document.getElementById('opciones');
  contenedor.innerHTML = '';

  pregunta.opciones.forEach((texto, indice) => {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'opcion';
    boton.dataset.indice = String(indice);
    boton.innerHTML =
      '<span class="opcion-letra" aria-hidden="true">' + LETRAS[indice] + '</span>' +
      '<span class="opcion-texto">' + texto + '</span>';
    boton.addEventListener('click', () => {
      if (typeof responder === 'function') responder(indice);
    });
    contenedor.appendChild(boton);
  });

  /* comodines: se habilitan solo si siguen disponibles (RF-09) */
  actualizarComodines(estado);
  actualizarTemporizador(SEGUNDOS_POR_PREGUNTA, SEGUNDOS_POR_PREGUNTA);
}

/**
 * Estado de los botones de comodín según lo que queda disponible.
 */
function actualizarComodines(estado) {
  const botonCincuenta = document.getElementById('btn-comodin-50');
  const botonTiempo = document.getElementById('btn-comodin-tiempo');

  botonCincuenta.disabled = !estado.comodines.cincuenta || estado.bloqueada;
  botonTiempo.disabled = !estado.comodines.tiempo || estado.bloqueada;

  botonCincuenta.classList.toggle('agotado', !estado.comodines.cincuenta);
  botonTiempo.classList.toggle('agotado', !estado.comodines.tiempo);
}

/**
 * Actualiza el temporizador circular y su texto (RF-05).
 */
function actualizarTemporizador(segundos, total) {
  const contenedor = document.getElementById('temporizador');
  const texto = document.getElementById('tiempo-restante');
  const avance = Math.max(0, Math.min(100, (segundos / total) * 100));

  texto.textContent = String(segundos);
  contenedor.style.setProperty('--avance', avance + '%');
  contenedor.classList.toggle('urgente', segundos <= 5);
  contenedor.setAttribute('aria-label', 'Tiempo restante: ' + segundos + ' segundos');
}

/**
 * Marca la opción elegida y resalta la correcta (RF-06 y RF-07).
 */
function marcarRespuesta(indiceElegido, indiceCorrecta) {
  const botones = document.querySelectorAll('#opciones .opcion');

  botones.forEach((boton, indice) => {
    boton.disabled = true;
    boton.classList.add('bloqueada');
    if (indice === indiceCorrecta) boton.classList.add('correcta');
    if (indiceElegido >= 0 && indice === indiceElegido && indiceElegido !== indiceCorrecta) {
      boton.classList.add('incorrecta');
    }
  });
}

/**
 * Elimina dos opciones incorrectas (comodín 50/50, RF-09).
 */
function ocultarOpcionesIncorrectas(indiceCorrecta, estados) {
  document.querySelectorAll('#opciones .opcion').forEach((boton, indice) => {
    if (estados[indice] && indice !== indiceCorrecta) {
      boton.classList.add('oculta');
      boton.disabled = true;
    }
  });
}

/* --------------------------- RETROALIMENTACIÓN ------------------------- */

function mostrarRetroalimentacion(datos) {
  const modal = document.getElementById('modal-retro');
  const icono = document.getElementById('retro-icono');
  const estado = document.getElementById('retro-estado');
  const explicacion = document.getElementById('retro-explicacion');
  const puntos = document.getElementById('retro-puntos');
  const boton = document.getElementById('btn-siguiente');
  const falla = document.getElementById('retro-falla');

  /* Ilustración acorde al desenlace: acierto, fallo o tiempo agotado. */
  const clave = datos.correcta
    ? 'retroCorrecta'
    : (datos.tiempoAgotado ? 'retroTiempo' : 'retroIncorrecta');
  icono.innerHTML = ilustracionSVG(clave);

  estado.textContent = datos.correcta ? '¡Correcto!' : 'Incorrecto';
  estado.className = 'retro-estado ' + (datos.correcta ? 'es-correcta' : 'es-incorrecta');

  explicacion.textContent = datos.explicacion;

  if (datos.correcta) {
    falla.hidden = true;
    puntos.hidden = false;
    puntos.textContent = '+' + datos.puntos + ' puntos' + (datos.detalle ? ' · ' + datos.detalle : '');
  } else {
    falla.hidden = false;
    let texto = datos.tiempoAgotado
      ? 'Se acabó el tiempo. '
      : 'Tu respuesta: ' + (datos.respuestaJugador || '') + '. ';
    texto += datos.respuestaCorrecta ? 'Respuesta correcta: ' + datos.respuestaCorrecta : '';
    falla.textContent = texto;
    puntos.hidden = true;
  }

  boton.textContent = datos.ultima ? 'Ver resultado' : 'Siguiente pregunta';
  modal.hidden = false;
  modal.classList.add('visible');
  boton.focus();
}

function ocultarRetroalimentacion() {
  const modal = document.getElementById('modal-retro');
  modal.classList.remove('visible');
  modal.hidden = true;
}

/* ------------------------------ RESULTADO ----------------------------- */

/**
 * Pantalla de resultado: puntaje, aciertos, tiempo, posición y preguntas falladas.
 */
function mostrarResultado(resumen) {
  document.getElementById('puntaje-final').textContent = resumen.puntaje;
  document.getElementById('dato-aciertos').textContent = resumen.aciertos + ' de ' + resumen.preguntas;
  document.getElementById('dato-tiempo').textContent = formatearTiempo(resumen.tiempoTotal);
  document.getElementById('dato-posicion').textContent =
    resumen.posicion > 0 ? '#' + resumen.posicion + ' de 10' : 'Fuera del top 10';

  const etiquetaCategoria = CATEGORIAS.find((c) => c.id === resumen.categoria);
  const etiquetaDificultad = DIFICULTADES.find((d) => d.id === resumen.dificultad);
  document.getElementById('dato-configuracion').textContent =
    (etiquetaCategoria ? etiquetaCategoria.nombre : '') + ' · ' + (etiquetaDificultad ? etiquetaDificultad.nombre : '');

  document.getElementById('mensaje-final').textContent = mensajeDesempeno(resumen.aciertos, resumen.preguntas);

  /* revisión de las preguntas falladas */
  const lista = document.getElementById('lista-falladas');
  lista.innerHTML = '';

  if (!resumen.falladas.length) {
    document.getElementById('sin-fallas').hidden = false;
  } else {
    document.getElementById('sin-fallas').hidden = true;
    resumen.falladas.forEach((falla) => {
      const item = document.createElement('li');
      item.className = 'item-falla';

      const enunciado = document.createElement('p');
      enunciado.className = 'item-falla-enunciado';
      enunciado.textContent = falla.enunciado;

      const respuesta = document.createElement('p');
      respuesta.className = 'item-falla-respuesta';
      respuesta.innerHTML =
        '<span class="mal">Tu respuesta: ' + (falla.respuestaJugador || 'Sin responder') + '</span>' +
        '<span class="bien">Correcta: ' + falla.respuestaCorrecta + '</span>';

      const explicacion = document.createElement('p');
      explicacion.className = 'item-falla-explicacion';
      explicacion.textContent = falla.explicacion;

      item.appendChild(enunciado);
      item.appendChild(respuesta);
      item.appendChild(explicacion);
      lista.appendChild(item);
    });
  }

  mostrarPantalla('pantalla-resultado');
}

function formatearTiempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = segundos % 60;
  return min > 0 ? min + ' min ' + seg + ' s' : seg + ' s';
}

function mensajeDesempeno(aciertos, total) {
  const ratio = total ? aciertos / total : 0;
  if (ratio === 1) return '¡Impecable! Conoces a la perfección a Colombia.';
  if (ratio >= 0.8) return '¡Excelente desempeño! Estás listo para la siguiente ronda.';
  if (ratio >= 0.6) return '¡Muy bien! Un poco más de estudio y será perfecto.';
  if (ratio >= 0.4) return 'Vas por buen camino, repasa las preguntas falladas.';
  return 'No te rindas: revisa las explicaciones y vuelve a intentarlo.';
}

/* ------------------------------- RANKING ------------------------------ */

/**
 * Tabla del top 10 y estadísticas del jugador (RF-13).
 */
function renderRanking() {
  const ranking = obtenerRanking();
  const cuerpo = document.getElementById('cuerpo-ranking');
  const vacio = document.getElementById('ranking-vacio');
  const tabla = document.getElementById('tabla-ranking');

  cuerpo.innerHTML = '';

  if (!ranking.length) {
    vacio.hidden = false;
    tabla.hidden = true;
  } else {
    vacio.hidden = true;
    tabla.hidden = false;

    ranking.forEach((partida, indice) => {
      const fila = document.createElement('tr');

      const etiquetaCategoria = CATEGORIAS.find((c) => c.id === partida.categoria);
      const etiquetaDificultad = DIFICULTADES.find((d) => d.id === partida.dificultad);

      fila.innerHTML =
        '<td class="posicion">' + (indice + 1) + '</td>' +
        '<td class="nombre">' + escaparHTML(partida.nombre) + '</td>' +
        '<td class="puntaje">' + partida.puntaje + '</td>' +
        '<td>' + (etiquetaCategoria ? etiquetaCategoria.nombre : partida.categoria) + '</td>' +
        '<td>' + (etiquetaDificultad ? etiquetaDificultad.nombre : partida.dificultad) + '</td>' +
        '<td class="fecha">' + formatearFecha(partida.fecha) + '</td>';

      if (indice < 3) fila.classList.add('medalla-' + (indice + 1));
      cuerpo.appendChild(fila);
    });
  }

  renderEstadisticas();
}

function renderEstadisticas() {
  const stats = obtenerEstadisticas();
  const mejor = categoriaConMejorDesempeno(stats);

  document.getElementById('stat-partidas').textContent = stats.partidas;
  document.getElementById('stat-porcentaje').textContent = porcentajeAciertos(stats) + '%';
  document.getElementById('stat-mejor').textContent = stats.mejorPuntaje;
  document.getElementById('stat-categoria').textContent = mejor ? mejor.nombre : 'Sin datos';
  document.getElementById('stat-categoria-detalle').textContent = mejor ? mejor.porcentaje + '% de aciertos' : 'Juega una partida';
}

function formatearFecha(iso) {
  if (!iso) return '—';
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return '—';
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  return dia + '/' + mes + '/' + fecha.getFullYear();
}

function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}
