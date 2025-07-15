document.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('.ramo'));

  // Crear un mapa para buscar ramo por nombre
  const mapaRamos = new Map();
  ramos.forEach(ramo => {
    mapaRamos.set(ramo.dataset.nombre, ramo);
  });

  // Inicializar cada ramo
  ramos.forEach(ramo => {
    const prerrequisitos = ramo.dataset.prerrequisitos.trim();

    // Poner span con nombre para tachado sólo nombre
    const nombreTexto = ramo.textContent.trim();
    ramo.innerHTML = `<span class="nombre">${nombreTexto}</span><div class="tooltip">${formatDescripcion(ramo.dataset.descripcion)}</div>`;

    // Definir estado inicial
    // Si semestre I (prerrequisitos vacíos y semestre I) activo
    // Si prerrequisitos vacíos pero semestre distinto a I, inactivo (hasta activar otro ramo)
    // Si tiene prerrequisitos, inactivo
    const semestre = ramo.closest('.semestre').dataset.semestre;
    if (prerrequisitos === "") {
      if (semestre === "I") {
        setActive(ramo);
      } else {
        setInactive(ramo);
      }
    } else {
      setInactive(ramo);
    }
  });

  // Click en ramo
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('inactivo')) return; // no hace nada si inactivo

      // Toggle estado aprobado
      const estaActivo = ramo.classList.toggle('activo');

      // Tachado sólo nombre
      const nombreSpan = ramo.querySelector('span.nombre');
      if (estaActivo) {
        nombreSpan.classList.add('tachado');
      } else {
        nombreSpan.classList.remove('tachado');
      }

      // Luego actualiza prerrequisitos y el resto de semestres según reglas
      actualizarEstados();
    });
  });

  // Función para actualizar todos los estados después de cada click
  function actualizarEstados() {
    // 1. Detectar ramos aprobados
    const aprobados = new Set(
      ramos.filter(r => r.classList.contains('activo')).map(r => r.dataset.nombre)
    );

    // 2. Recorrer cada ramo y decidir si activo o inactivo:
    ramos.forEach(ramo => {
      const prerrequisitos = ramo.dataset.prerrequisitos.trim();
      const semestre = ramo.closest('.semestre').dataset.semestre;

      // Si ramo aprobado, siempre activo (color morado y tachado)
      if (aprobados.has(ramo.dataset.nombre)) {
        setActive(ramo);
        return;
      }

      // Si semestre I y sin prerrequisitos: activo siempre (excepto si está aprobado que ya está activo)
      if (semestre === "I" && prerrequisitos === "") {
        setActive(ramo);
        return;
      }

      // Para ramos con prerrequisitos: activar solo si TODOS sus prerrequisitos están aprobados
      if (prerrequisitos !== "") {
        const prereqList = prerrequisitos.split(';').map(s => s.trim());
        const todosAprobados = prereqList.every(p => aprobados.has(p));
        if (todosAprobados) {
          setActive(ramo);
        } else {
          setInactive(ramo);
          removeAprobadoYTachado(ramo);
        }
        return;
      }

      // Para ramos sin prerrequisito en semestres II a X:
      // Deben activarse solo si algún ramo de su mismo semestre está aprobado
      if (prerrequisitos === "" && semestre !== "I") {
        // Buscar si existe ramo aprobado en ese semestre distinto a este ramo
        const otroAprobado = ramos.some(r => {
          return r.closest('.semestre').dataset.semestre === semestre && r !== ramo && aprobados.has(r.dataset.nombre);
        });

        if (otroAprobado) {
          setActive(ramo);
        } else {
          setInactive(ramo);
          removeAprobadoYTachado(ramo);
        }
      }
    });
  }

  // Funciones auxiliares

  function setActive(ramo) {
    ramo.classList.remove('inactivo');
    ramo.style.pointerEvents = 'auto';
  }

  function setInactive(ramo) {
    ramo.classList.add('inactivo');
    ramo.style.pointerEvents = 'none';
  }

  function removeAprobadoYTachado(ramo) {
    ramo.classList.remove('activo');
    const nombreSpan = ramo.querySelector('span.nombre');
    if (nombreSpan) nombreSpan.classList.remove('tachado');
  }

  function formatDescripcion(desc) {
    if (!desc) return "";
    // reemplazar puntos y comas por punto y aparte
    return desc
      .replace(/;/g, '.')
      .split('.')
      .map(s => s.trim())
      .filter(Boolean)
      .join('.<br><br>') + '.';
  }

  // Ejecutar actualización inicial para respetar prerrequisitos y activar/inactivar
  actualizarEstados();
});
