document.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('.ramo'));

  // Mapa para buscar ramo por nombre
  const mapaRamos = new Map();
  ramos.forEach(ramo => {
    mapaRamos.set(ramo.dataset.nombre, ramo);
  });

  // Inicializar ramos sin tooltip y con estructura simple
  ramos.forEach(ramo => {
    const semestre = ramo.closest('.semestre').dataset.semestre;
    const prerrequisitos = ramo.dataset.prerrequisitos.trim();

    // Elimina cualquier tooltip o texto extra (por si existía)
    ramo.title = '';

    // Estado inicial: semestre I sin prerrequisitos activo, resto inactivo
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

  // Click para activar/desactivar ramos
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('inactivo')) return; // no hace nada si está inactivo

      // Toggle aprobado
      const aprobado = ramo.classList.toggle('activo');

      // NO se tacha el nombre (quitamos esa funcionalidad)

      // Actualizar prerrequisitos y activar/inactivar según reglas
      actualizarEstados();
    });
  });

  function actualizarEstados() {
    // Detectar ramos aprobados
    const aprobados = new Set(
      ramos.filter(r => r.classList.contains('activo')).map(r => r.dataset.nombre)
    );

    // Actualizar estado de cada ramo
    ramos.forEach(ramo => {
      const prerrequisitos = ramo.dataset.prerrequisitos.trim();
      const semestre = ramo.closest('.semestre').dataset.semestre;

      if (aprobados.has(ramo.dataset.nombre)) {
        setActive(ramo);
        return;
      }

      if (semestre === "I" && prerrequisitos === "") {
        setActive(ramo);
        return;
      }

      if (prerrequisitos !== "") {
        const prereqList = prerrequisitos.split(';').map(s => s.trim());
        const todosAprobados = prereqList.every(p => aprobados.has(p));
        if (todosAprobados) {
          setActive(ramo);
        } else {
          setInactive(ramo);
          ramo.classList.remove('activo'); // si estaba aprobado, quitarlo
        }
        return;
      }

      if (prerrequisitos === "" && semestre !== "I") {
        // Activar solo si algún ramo del semestre está aprobado
        const otroAprobado = ramos.some(r => {
          return r.closest('.semestre').dataset.semestre === semestre && r !== ramo && aprobados.has(r.dataset.nombre);
        });

        if (otroAprobado) {
          setActive(ramo);
        } else {
          setInactive(ramo);
          ramo.classList.remove('activo');
        }
      }
    });
  }

  function setActive(ramo) {
    ramo.classList.remove('inactivo');
    ramo.style.pointerEvents = 'auto';
    ramo.style.opacity = '1';
  }

  function setInactive(ramo) {
    ramo.classList.add('inactivo');
    ramo.style.pointerEvents = 'none';
    ramo.style.opacity = '0.5';
  }

  actualizarEstados();
});
