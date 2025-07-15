document.addEventListener('DOMContentLoaded', () => {
  const ramos = Array.from(document.querySelectorAll('.ramo'));

  // Inicializar cada ramo: si tiene prerrequisito, inicialmente inactivo
  ramos.forEach(ramo => {
    const prerrequisitos = ramo.dataset.prerrequisitos.trim();
    if (prerrequisitos !== "") {
      setInactive(ramo);
    } else {
      setActive(ramo);
    }

    // Añadir span para nombre (para tachado sólo del texto)
    const nombreTexto = ramo.textContent.trim();
    ramo.innerHTML = `<span class="nombre">${nombreTexto}</span><div class="tooltip">${formatDescripcion(ramo.dataset.descripcion)}</div>`;
  });

  // Al hacer click, toggle aprobado / no aprobado
  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('inactivo')) return; // No hacer nada si inactivo

      const aprobado = ramo.classList.toggle('activo'); // Alterna clase activo (morado)

      // Toggle tachado sólo del nombre
      const nombreSpan = ramo.querySelector('span.nombre');
      if (aprobado) {
        nombreSpan.classList.add('tachado');
      } else {
        nombreSpan.classList.remove('tachado');
      }

      // Activar/desactivar prerrequisitos
      actualizarPrerrequisitos();
    });
  });

  // Función que actualiza los prerrequisitos según aprobados
  function actualizarPrerrequisitos() {
    ramos.forEach(ramo => {
      const prereqText = ramo.dataset.prerrequisitos.trim();
      if (prereqText === "") {
        // Si no tiene prerrequisitos, siempre activo
        setActive(ramo);
        return;
      }

      // Si tiene varios prerrequisitos, separar por ";"
      const prereqList = prereqText.split(';').map(x => x.trim());

      // Verificar que todos los prerrequisitos estén aprobados
      const todosAprobados = prereqList.every(prerrequisitoNombre => {
        const ramoPrerrequisito = ramos.find(r => r.dataset.nombre === prerrequisitoNombre);
        return ramoPrerrequisito && ramoPrerrequisito.classList.contains('activo');
      });

      if (todosAprobados) {
        setActive(ramo);
      } else {
        setInactive(ramo);
        // Si está activo, quitar activo
        ramo.classList.remove('activo');
        // Quitar tachado si hay
        ramo.querySelector('span.nombre').classList.remove('tachado');
      }
    });
  }

  // Funciones para setear clases y estilos
  function setActive(ramo) {
    ramo.classList.remove('inactivo');
    ramo.style.pointerEvents = 'auto';
  }

  function setInactive(ramo) {
    ramo.classList.add('inactivo');
    ramo.style.pointerEvents = 'none';
  }

  // Función para formatear descripción con punto y aparte en vez de ";"
  function formatDescripcion(desc) {
    if (!desc) return "";
    return desc.split('.').map(s => s.trim()).filter(Boolean).join('.<br><br>') + '.';
  }
});
