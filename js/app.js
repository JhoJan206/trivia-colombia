'use strict';

/**
 * app.js
 * Punto de entrada: inicializa la aplicación, controla la navegación
 * entre pantallas y conecta los eventos de la interfaz con la lógica.
 */

document.addEventListener('DOMContentLoaded', () => {
  const preferencias = obtenerPreferencias();

  /* preferencias guardadas: tema, sonido y último nombre */
  aplicarTema(preferencias.tema);
  establecerSonido(preferencias.sonido);
  sincronizarBotonesPreferencias(preferencias);

  const inputNombre = document.getElementById('input-nombre');
  inputNombre.value = preferencias.nombre || '';

  renderConfiguracion();
  estado.jugador = preferencias.nombre || '';
  estado.categoria = 'todas';
  estado.dificultad = 'facil';
  marcarSeleccion(estado);

  registrarEventos();
  mostrarPantalla('pantalla-inicio');
});

/* -------------------------- NAVEGACIÓN ------------------------------- */

function registrarEventos() {
  /* botones con data-ir="id-de-pantalla" */
  document.querySelectorAll('[data-ir]').forEach((boton) => {
    boton.addEventListener('click', (evento) => {
      if (boton.tagName === 'A') evento.preventDefault();
      const destino = boton.dataset.ir;
      if (destino === 'pantalla-ranking') renderRanking();
      if (destino === 'pantalla-config') marcarSeleccion(estado);
      reproducirSonido('clic');
      mostrarPantalla(destino);
    });
  });

  /* RF-01: nombre obligatorio */
  document.getElementById('form-inicio').addEventListener('submit', (evento) => {
    evento.preventDefault();
    validarNombre();
  });

  /* selección de categoría y dificultad (RF-02) */
  document.getElementById('contenedor-categorias').addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-categoria]');
    if (!boton) return;
    estado.categoria = boton.dataset.categoria;
    marcarSeleccion(estado);
    reproducirSonido('clic');
  });

  document.getElementById('contenedor-dificultades').addEventListener('click', (evento) => {
    const boton = evento.target.closest('[data-dificultad]');
    if (!boton) return;
    estado.dificultad = boton.dataset.dificultad;
    marcarSeleccion(estado);
    reproducirSonido('clic');
  });

  document.getElementById('btn-comenzar').addEventListener('click', () => {
    if (!estado.jugador) {
      mostrarPantalla('pantalla-inicio');
      mostrarErrorNombre('Escribe tu nombre antes de jugar.');
      return;
    }
    reproducirSonido('clic');
    iniciarPartida(estado.categoria, estado.dificultad, estado.jugador);
  });

  /* comodines (RF-09) */
  document.getElementById('btn-comodin-50').addEventListener('click', () => usarComodin('cincuenta'));
  document.getElementById('btn-comodin-tiempo').addEventListener('click', () => usarComodin('tiempo'));

  /* avanzar desde la retroalimentación */
  document.getElementById('btn-siguiente').addEventListener('click', siguientePregunta);

  /* salir de una partida en curso */
  document.getElementById('btn-salir-juego').addEventListener('click', () => {
    if (window.confirm('¿Abandonar la partida? Se perderá el progreso actual.')) {
      detenerTemporizador();
      ocultarRetroalimentacion();
      marcarSeleccion(estado);
      mostrarPantalla('pantalla-config');
    }
  });

  /* resultado (RF-14) */
  document.getElementById('btn-jugar-de-nuevo').addEventListener('click', () => {
    marcarSeleccion(estado);
    mostrarPantalla('pantalla-config');
  });

  /* ranking */
  document.getElementById('btn-borrar-ranking').addEventListener('click', () => {
    if (window.confirm('¿Seguro que quieres borrar el ranking y las estadísticas?')) {
      borrarRanking();
      borrarEstadisticas();
      renderRanking();
    }
  });

  /* preferencias: sonido y tema */
  document.getElementById('btn-sonido').addEventListener('click', () => {
    const activo = document.getElementById('btn-sonido').getAttribute('aria-pressed') !== 'true';
    establecerSonido(activo);
    guardarPreferencias({ sonido: activo });
    sincronizarBotonesPreferencias(obtenerPreferencias());
    if (activo) reproducirSonido('clic');
  });

  document.getElementById('btn-tema').addEventListener('click', () => {
    const actual = document.documentElement.getAttribute('data-tema');
    const nuevo = actual === 'oscuro' ? 'claro' : 'oscuro';
    aplicarTema(nuevo);
    guardarPreferencias({ tema: nuevo });
    sincronizarBotonesPreferencias(obtenerPreferencias());
  });

  /* atajos de teclado para responder (accesibilidad) */
  document.addEventListener('keydown', (evento) => {
    const pantallaJuego = document.getElementById('pantalla-juego');
    if (!pantallaJuego.classList.contains('activa')) return;
    if (estado.bloqueada) return;

    const indice = ['1', '2', '3', '4'].indexOf(evento.key);
    if (indice >= 0) responder(indice);
  });
}

/* ---------------------------- NOMBRE --------------------------------- */

function validarNombre() {
  const input = document.getElementById('input-nombre');
  const nombre = input.value.trim();

  if (!nombre) {
    mostrarErrorNombre('Escribe tu nombre para aparecer en el ranking.');
    input.focus();
    return false;
  }

  ocultarErrorNombre();
  estado.jugador = nombre;
  guardarPreferencias({ nombre });
  marcarSeleccion(estado);
  mostrarPantalla('pantalla-config');
  return true;
}

function mostrarErrorNombre(mensaje) {
  const error = document.getElementById('error-nombre');
  error.textContent = mensaje;
  error.hidden = false;
}

function ocultarErrorNombre() {
  document.getElementById('error-nombre').hidden = true;
}

/* --------------------------- PREFERENCIAS ----------------------------- */

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-tema', tema === 'oscuro' ? 'oscuro' : 'claro');
}

function sincronizarBotonesPreferencias(preferencias) {
  const btnSonido = document.getElementById('btn-sonido');
  const btnTema = document.getElementById('btn-tema');

  btnSonido.setAttribute('aria-pressed', preferencias.sonido ? 'true' : 'false');
  btnSonido.textContent = preferencias.sonido ? '🔊' : '🔇';
  btnSonido.title = preferencias.sonido ? 'Desactivar sonido' : 'Activar sonido';

  const oscuro = preferencias.tema === 'oscuro';
  btnTema.setAttribute('aria-pressed', oscuro ? 'true' : 'false');
  btnTema.textContent = oscuro ? '☀️' : '🌙';
  btnTema.title = oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
}
