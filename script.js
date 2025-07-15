const data = {
  "I": [
    {
      nombre: "Razonamiento Lógico Matemático",
      tipo: "Asignatura Ciencias Básicas. Formación Disciplinar en el Curso de Vida.",
      abre: ["Acústica y Biomecánica", "Estadística y Epidemiología en Fonoaudiología"]
    },
    {
      nombre: "Introducción a la Fonoaudiología",
      tipo: "Asignatura de Formación Profesional. Formación Disciplinar en el Curso de Vida. Asignatura con Actividad Práctica. Asignatura con Simulación Clínica.",
      abre: ["Comunicación y Lingüística"]
    },
    {
      nombre: "Atención Básica de Urgencias",
      tipo: "Asignatura común de Facultad. Formación de Facultad Interdisciplinarias. Asignatura con Simulación Clínica.",
      abre: []
    },
    {
      nombre: "Taller de Competencias para el Aprendizaje",
      tipo: "Asignatura Ciencias Básicas. Formación General.",
      abre: []
    },
    {
      nombre: "Principios de la Biología",
      tipo: "Asignatura Ciencias Básicas. Formación Disciplinar en el Curso de Vida. Asignatura con Actividad Práctica.",
      abre: []
    },
    {
      nombre: "Taller de Competencias Comunicativas",
      tipo: "Asignatura de Formación General. Formación General.",
      abre: []
    }
  ],
  "II": [
    {
      nombre: "Acústica y Biomecánica",
      tipo: "Asignatura de Formación Profesional. Formación General. Asignatura con Actividad Práctica.",
      abre: ["Valoración Auditiva en el Curso de Vida I"],
      requiere: ["Razonamiento Lógico Matemático"]
    },
    {
      nombre: "Comunicación y Lingüística",
      tipo: "Asignatura de Formación Profesional. Formación Disciplinar en el Curso de Vida. Asignatura con Actividad Práctica.",
      abre: ["Significado y Estructuras del Lenguaje"],
      requiere: ["Introducción a la Fonoaudiología"]
    }
    // Agrega más ramos según corresponda
  ]
  // Continúa con III al X...
};

const mallaDiv = document.getElementById("malla");

Object.keys(data).forEach(sem => {
  const semDiv = document.createElement("div");
  semDiv.classList.add("semestre");

  const title = document.createElement("h3");
  title.textContent = `Semestre ${sem}`;
  semDiv.appendChild(title);

  const ramosDiv = document.createElement("div");
  ramosDiv.classList.add("ramos");

  data[sem].forEach(ramo => {
    const ramoDiv = document.createElement("div");
    ramoDiv.classList.add("ramo");

    // Si tiene requisitos, se deja deshabilitado
    if (ramo.requiere && ramo.requiere.length > 0) {
      ramoDiv.classList.add("disabled");
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("card-front");
    front.textContent = ramo.nombre;

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.textContent = ramo.tipo.replaceAll(";", ".").replaceAll(".", ".\n");

    card.appendChild(front);
    card.appendChild(back);
    ramoDiv.appendChild(card);
    ramosDiv.appendChild(ramoDiv);

    // Guardar referencia
    ramo.el = ramoDiv;
    ramo.card = card;

    // Evento de aprobación
    ramoDiv.addEventListener("click", () => {
      if (ramoDiv.classList.contains("disabled")) return;
      card.classList.toggle("aprobado");
      localStorage.setItem(ramo.nombre, card.classList.contains("aprobado"));

      // Desbloquear ramos que dependen de este
      Object.values(data).flat().forEach(r => {
        if (r.requiere && r.requiere.includes(ramo.nombre)) {
          const requisitosAprobados = r.requiere.every(req => localStorage.getItem(req) === "true");
          if (requisitosAprobados) r.el.classList.remove("disabled");
        }
      });
    });

    // Restaurar estado
    const estado = localStorage.getItem(ramo.nombre);
    if (estado === "true") {
      card.classList.add("aprobado");
      if (ramo.abre) {
        ramo.abre.forEach(nombre => {
          Object.values(data).flat().forEach(r => {
            if (r.nombre === nombre && r.el) {
              r.el.classList.remove("disabled");
            }
          });
        });
      }
    }
  });

  semDiv.appendChild(ramosDiv);
  mallaDiv.appendChild(semDiv);
});
