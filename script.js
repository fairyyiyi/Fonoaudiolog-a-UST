document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Función para actualizar estados de prerrequisitos y estilos
  function actualizarEstados() {
    // Primero, todos inactivos excepto primer semestre
    ramos.forEach(ramo => {
      if (!ramo.dataset.prerequisitos) {
        // Si no tiene prerrequisito, inicialmente inactivo (salvo primer semestre)
        if (!ramo.classList.contains("aprobado") && !ramo.classList.contains("primer-semestre")) {
          ramo.classList.add("inactivo");
        }
      } else {
        ramo.classList.add("inactivo");
      }
    });

    // Ahora activar los ramos que tienen prerrequisitos aprobados
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prerequisitos ? ramo.dataset.prerequisitos.split(",") : [];
      if (prereqs.length === 0) {
        if (ramo.classList.contains("primer-semestre")) ramo.classList.remove("inactivo");
      } else {
        // Si todos los prerrequisitos están aprobados, se activa
        const todosAprobados = prereqs.every(id => {
          const pre = document.getElementById(id);
          return pre && pre.classList.contains("aprobado");
        });
        if (todosAprobados) ramo.classList.remove("inactivo");
      }
    });
  }

  // Manejar click en ramo
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("inactivo")) return; // no hace nada si inactivo
      ramo.classList.toggle("aprobado");
      actualizarEstados();
    });
  });

  // Marca primer semestre para no desactivarlos
  ramos.forEach(ramo => {
    if (ramo.dataset.semestre && ramo.dataset.semestre === "1") {
      ramo.classList.add("primer-semestre");
    }
  });

  // Inicializamos
  actualizarEstados();
});
