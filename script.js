document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  function actualizarEstados() {
    // Mapa semestre => array de ramos aprobados en ese semestre
    const aprobadosPorSemestre = {};

    // Guardar qué ramos están aprobados por semestre
    ramos.forEach(ramo => {
      const semestre = ramo.dataset.semestre;
      if (!aprobadosPorSemestre[semestre]) aprobadosPorSemestre[semestre] = [];
      if (ramo.classList.contains("aprobado")) {
        aprobadosPorSemestre[semestre].push(ramo.id);
      }
    });

    // Para cada ramo, decidir si está activo o no
    ramos.forEach(ramo => {
      const semestre = ramo.dataset.semestre;
      const prereqsRaw = ramo.dataset.prerequisitos || "";
      const prereqs = prereqsRaw.split(",").map(s => s.trim()).filter(Boolean);

      if (ramo.classList.contains("aprobado")) {
        ramo.classList.remove("inactivo");
        return; // aprobado siempre activo
      }

      if (semestre === "1") {
        // Primer semestre siempre activo si no está aprobado
        ramo.classList.remove("inactivo");
        return;
      }

      // Si no tiene prerrequisitos
      if (prereqs.length === 0) {
        // Si hay al menos un ramo aprobado en su semestre, activar
        if (aprobadosPorSemestre[semestre] && aprobadosPorSemestre[semestre].length > 0) {
          ramo.classList.remove("inactivo");
        } else {
          // sino, inactivo
          ramo.classList.add("inactivo");
        }
        return;
      }

      // Si tiene prerrequisitos: activamos solo si TODOS sus prerrequisitos están aprobados
      const todosAprobados = prereqs.every(id => {
        const preRamo = document.getElementById(id);
        return preRamo && preRamo.classList.contains("aprobado");
      });

      if (todosAprobados) {
        ramo.classList.remove("inactivo");
      } else {
        ramo.classList.add("inactivo");
      }
    });
  }

  // Click para marcar/desmarcar aprobado
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("inactivo")) return; // no hacer nada si inactivo
      ramo.classList.toggle("aprobado");
      actualizarEstados();
    });
  });

  // Inicializar estados
  actualizarEstados();
});
