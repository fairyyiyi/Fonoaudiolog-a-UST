const malla = {
  "I Semestre": [
    "Razonamiento Lógico Matemático",
    "Introducción a la Fonoaudiología",
    "Atención Básica de Urgencias",
    "Taller de Competencias para el Aprendizaje",
    "Principios de la Biología",
    "Taller de Competencias Comunicativas"
  ],
  "II Semestre": [
    "Acústica y Biomecánica",
    "Comunicación y Lingüística",
    "Procesos Cognitivos y Desarrollo en el Curso de Vida",
    "Anatomía y Fisiología General",
    "Salud y Sociedad",
    "Cultura y Valores"
  ],
  "III Semestre": [
    "Estadística y Epidemiología en Fonoaudiología",
    "Significado y Estructuras del Lenguaje",
    "Neuropsiquiatría",
    "Bases Morfofuncionales de la Fonoaudiología",
    "Personas y Sentido",
    "Taller de Desarrollo Personal I",
    "Inglés Básico I"
  ],
  "IV Semestre": [
    "Evaluación del Desarrollo de Competencias MEC FON HITO 1",
    "Lenguaje y Sociedad",
    "Fonoestamología",
    "Fisiopatología de la Comunicación",
    "Evaluación Participativa con la Comunidad",
    "Taller de Desarrollo Personal II",
    "Inglés Básico II"
  ],
  "V Semestre": [
    "Valoración Auditiva en el Curso de Vida I",
    "Desarrollo en Niños, Niñas y Adolescentes I",
    "Desarrollo en el Adulto y Personas Mayores",
    "Abordaje Fonoaudiológico en la Comunicación Educativa",
    "Intervención Comunitaria",
    "Ética y Salud"
  ],
  "VI Semestre": [
    "Gestión e Innovación en Fonoaudiología",
    "Abordaje en Niños, Niñas y Adolescentes I",
    "Abordaje en Adultos y Personas Mayores I",
    "Bases de la Rehabilitación y Redes Integradas de Servicio de Salud",
    "Valoración Auditiva en el Curso de Vida II",
    "Desarrollo de la Voz y Técnica Vocal",
    "Electivo I"
  ],
  "VII Semestre": [
    "Abordaje en Niños, Niñas y Adolescentes II",
    "Abordaje en Adultos y Personas Mayores II",
    "Electivo II",
    "Abordaje Auditivo en el Curso de Vida",
    "Abordaje de la Voz Hablada y Cantada I",
    "Práctica Curricular I"
  ],
  "VIII Semestre": [
    "Metodología de la Investigación",
    "Abordaje de la Deglución y Alimentación Oral",
    "Electivo III",
    "Evaluación del Desarrollo de Competencias MEC FON HITO 2",
    "Abordaje Vesicular en el Curso de Vida",
    "Abordaje de la Voz Hablada y Cantada II",
    "Práctica Curricular II"
  ],
  "IX Semestre": [
    "Seminario de Grado I",
    "Internado Profesional I",
    "Internado Profesional II"
  ],
  "X Semestre": [
    "Seminario de Grado II",
    "Internado III",
    "Internado IV"
  ]
};

// Ramo => [ramos que lo activan]
const prerrequisitos = {
  "Acústica y Biomecánica": ["Razonamiento Lógico Matemático"],
  "Comunicación y Lingüística": ["Introducción a la Fonoaudiología"],
  "Estadística y Epidemiología en Fonoaudiología": ["Razonamiento Lógico Matemático"],
  "Significado y Estructuras del Lenguaje": ["Comunicación y Lingüística"],
  "Neuropsiquiatría": ["Procesos Cognitivos y Desarrollo en el Curso de Vida"],
  "Bases Morfofuncionales de la Fonoaudiología": ["Anatomía y Fisiología General"],
  "Evaluación Participativa con la Comunidad": ["Salud y Sociedad"],
  "Valoración Auditiva en el Curso de Vida I": [
    "Estadística y Epidemiología en Fonoaudiología",
    "Acústica y Biomecánica"
  ],
  "Lenguaje y Sociedad": ["Significado y Estructuras del Lenguaje"],
  "Fonoestamología": ["Bases Morfofuncionales de la Fonoaudiología"],
  "Fisiopatología de la Comunicación": ["Bases Morfofuncionales de la Fonoaudiología"],
  "Desarrollo en Niños, Niñas y Adolescentes I": ["Lenguaje y Sociedad"],
  "Desarrollo en el Adulto y Personas Mayores": ["Neuropsiquiatría"],
  "Valoración Auditiva en el Curso de Vida II": ["Valoración Auditiva en el Curso de Vida I"],
  "Abordaje en Niños, Niñas y Adolescentes I": ["Desarrollo en Niños, Niñas y Adolescentes I"],
  "Abordaje en Adultos y Personas Mayores I": ["Desarrollo en el Adulto y Personas Mayores"],
  "Abordaje de la Voz Hablada y Cantada I": ["Desarrollo de la Voz y Técnica Vocal"],
  "Abordaje en Niños, Niñas y Adolescentes II": ["Abordaje en Niños, Niñas y Adolescentes I"],
  "Abordaje en Adultos y Personas Mayores II": ["Abordaje en Adultos y Personas Mayores I"],
  "Abordaje de la Voz Hablada y Cantada II": ["Abordaje de la Voz Hablada y Cantada I"],
  "Seminario de Grado II": ["Seminario de Grado I"],
  "Internado III": ["Internado Profesional II"],
  "Internado IV": ["Internado Profesional II"]
};

const estadoRamos = {};

function actualizarEstados() {
  document.querySelectorAll(".ramo").forEach(div => {
    const nombre = div.textContent.trim();
    const estaActivo = estadoRamos[nombre];

    const requisitos = prerrequisitos[nombre] || [];
    const semestre = div.closest(".semestre").querySelector("h3").textContent;

    if (estaActivo) {
      div.classList.remove("inactivo");
      div.classList.add("tachado");
    } else {
      div.classList.remove("tachado");

      const cumplePrerreq = requisitos.every(req => estadoRamos[req]);
      const esSinPrerreq = requisitos.length === 0;

      const otrosActivados = Array.from(div.closest(".semestre").querySelectorAll(".ramo"))
        .filter(r => r !== div && estadoRamos[r.textContent.trim()]);

      const debeEstarInactivo = (
        !cumplePrerreq && (
          !esSinPrerreq || // tiene prerrequisitos que no se cumplen
          (semestre !== "I Semestre" && otrosActivados.length === 0) // es sin prerreq pero no hay ninguno activo en su semestre
        )
      );

      if (debeEstarInactivo) {
        div.classList.add("inactivo");
      } else {
        div.classList.remove("inactivo");
      }
    }
  });
}

function crearMalla() {
  const container = document.getElementById("malla");

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
        const nombre = box.textContent.trim();
        estadoRamos[nombre] = !estadoRamos[nombre];
        actualizarEstados();
      });

      col.appendChild(box);
      estadoRamos[ramo] = false;
    });

    container.appendChild(col);
  });

  actualizarEstados();
}

crearMalla();
