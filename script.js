// script.js

document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Separar el nombre del ramo y el detalle para poder tachar solo el nombre
  ramos.forEach(ramo => {
    const nombreTexto = ramo.textContent.trim();
    ramo.textContent = '';
    const nombreSpan = document.createElement('span');
    nombreSpan.classList.add('nombre-ramo');
    nombreSpan.textContent = nombreTexto;
    const detalleSpan = document.createElement('span');
    detalleSpan.classList.add('detalle');
    detalleSpan.textContent = ramo.dataset.info.replace(/;/g, '.\n').trim();
    ramo.appendChild(nombreSpan);
    ramo.appendChild(detalleSpan);
  });

  // Control de aprobación y prerrequisitos
  // Guarda los aprobados en localStorage para persistencia
  let aprobados = JSON.parse(localStorage.getItem('aprobadosFono') || '[]');

  function actualizarEstados() {
    ramos.forEach(ramo => {
      const nombre = ramo.dataset.nombre;
      const prerrequisitos = ramo.dataset.prerrequisitos ? ramo.dataset.prerrequisitos.split(';').map(s => s.trim()).filter(Boolean) : [];

      // Si ramo está aprobado, añadir clase y mostrar front tachado + reverso azul
      if (aprobados.includes(nombre)) {
        ramo.classList.add('aprobado');
        ramo.classList.remove('inactivo');
      } else {
        ramo.classList.remove('aprobado');
        // Revisar prerrequisitos
        const bloqueado = prerrequisitos.length > 0 && !prerrequisitos.every(pr => aprobados.includes(pr));
        if (bloqueado) {
          ramo.classList.add('inactivo');
          // Si estaba volteado, quitar volteo
          ramo.classList.remove('flipped');
        } else {
          ramo.classList.remove('inactivo');
        }
      }
    });
  }

  // Inicializa estados
  actualizarEstados();

  ramos.forEach(ramo => {
    ramo.addEventListener('click', () => {
      if (ramo.classList.contains('inactivo')) return; // no hace nada si está inactivo

      // Alternar clase flipped para volteo
      ramo.classList.toggle('flipped');
    });

    // Doble click para aprobar o desaprobar
    ramo.addEventListener('dblclick', () => {
      const nombre = ramo.dataset.nombre;
      if (aprobados.includes(nombre)) {
        aprobados = aprobados.filter(n => n !== nombre);
      } else {
        aprobados.push(nombre);
      }
      localStorage.setItem('aprobadosFono', JSON.stringify(aprobados));
      actualizarEstados();
    });
  });
});
