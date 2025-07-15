document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Marca primer semestre para no desactivarlos
  ramos.forEach(ramo => {
    if (ramo.dataset.semestre && ramo.dataset.semestre === "1") {
      ramo.classList.add("primer-semestre");
    }
  });

  // Función para actualizar estados de prerrequisitos y estilos
  function actualizarEstados() {
    // Primero, todos inactivos excepto primer semestre y aprobados
    ramos.forEach(ramo => {
      if (!ramo.classList.contains("aprobado") && !ramo.classList.contains("primer-semestre")) {
        ramo.classList.add("inactivo");
      }
    });

    // Ahora activar los ramos que tienen prerrequisitos aprobados o sin prerrequisitos pero están activados por semestre
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prerequisitos ? ramo.dataset.prerequisitos.split(",").filter(s => s.trim() !== "") : [];
      if (prereqs.length === 0) {
        // Si no tiene prerrequisito, activar sólo si es primer semestre o si está marcado para activarse (evitamos que ramos sin prerreq queden inactivos)
        if (ramo.classList.contains("primer-semestre")) {
          ramo.classList.remove("inactivo");
        } else {
          // Ver si hay algún ramo aprobado del mismo semestre que habilite su activación (según lo que pediste)
          // Aquí podemos decidir que se activen si hay algún ramo aprobado en el mismo semestre
          // Para simplificar, dejamos que ramos sin prerreq que no sean del primer semestre permanezcan inactivos hasta que haya actividad
          // Si quieres puedes cambiar la lógica aquí
        }
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
      if (ramo.classList.contains("inactivo")) return;
      ramo.classList.toggle("aprobado");
      actualizarEstados();
    });
  });

  // Inicializamos
  actualizarEstados();
});
