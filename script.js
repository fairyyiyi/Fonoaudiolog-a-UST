// Datos base de ejemplo: puedes reemplazarlos más adelante con los reales por semestre
const malla = {
  "I Semestre": [
    "Razonamiento Lógico Matemático",
    "Introducción a la Fonoaudiología",
    "Atención Básica de Urgencias",
    "Taller de Competencias para el Aprendizaje",
    "Principios de la Biología",
    "Taller de Competencias Comunicativas"
  ]
};

// Esta estructura se usará para almacenar el estado de cada ramo
const estadoRamos = {};

function crearMalla() {
  const container = document.querySelector(".malla-container");

  Object.entries(malla).forEach(([semestre, ramos]) => {
    const col = document.createElement("div");
    col.classList.add("semestre");

    const titulo = document.createElement("h3");
    titulo.textContent = semestre;
    col.appendChild(titulo);

    ramos.forEach((ramo) => {
      const box = document.createElement("div");
      box.classList.add("ramo");
      box.textContent = ramo;

      box.addEventListener("click", () => {
        box.classList.toggle("tachado");
        estadoRamos[ramo] = !estadoRamos[ramo];

        // Aquí podrías activar o desactivar prerrequisitos más adelante
        console.log(`${ramo}: ${estadoRamos[ramo] ? "Aprobado" : "No aprobado"}`);
      });

      col.appendChild(box);
      estadoRamos[ramo] = false; // Estado inicial: no aprobado
    });

    container.appendChild(col);
  });
}

crearMalla();
