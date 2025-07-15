// Define los semestres con sus ramos y prerrequisitos (abre)
const semestres = [
  {
    nombre: "I Semestre",
    ramos: [
      { id: "r1", nombre: "Razonamiento Lógico Matemático", abre: ["r7", "r9"] },
      { id: "r2", nombre: "Introducción a la Fonoaudiología", abre: ["r8"] },
      { id: "r3", nombre: "Atención Básica de Urgencias", abre: [] },
      { id: "r4", nombre: "Taller de Competencias para el Aprendizaje", abre: [] },
      { id: "r5", nombre: "Principios de la Biología", abre: [] },
      { id: "r6", nombre: "Taller de Competencias Comunicativas", abre: [] },
    ],
  },
  {
    nombre: "II Semestre",
    ramos: [
      { id: "r7", nombre: "Acústica y Biomecánica", abre: ["r13"] },
      { id: "r8", nombre: "Comunicación y Lingüística", abre: ["r14"] },
      { id: "r9", nombre: "Procesos Cognitivos y Desarrollo en el Curso de Vida", abre: ["r15"] },
      { id: "r10", nombre: "Anatomía y Fisiología General", abre: ["r16"] },
      { id: "r11", nombre: "Salud y Sociedad", abre: ["r18"] },
      { id: "r12", nombre: "Cultura y Valores", abre: [] },
    ],
  },
  {
    nombre: "III Semestre",
    ramos: [
      { id: "r13", nombre: "Estadística y Epidemiología en Fonoaudiología", abre: ["r20"] },
      { id: "r14", nombre: "Significado y Estructuras del Lenguaje", abre: ["r21"] },
      { id: "r15", nombre: "Neuropsiquiatría", abre: ["r22"] },
      { id: "r16", nombre: "Bases Morfofuncionales de la Fonoaudiología", abre: ["r23", "r24"] },
      { id: "r17", nombre: "Personas y Sentido", abre: [] },
      { id: "r18", nombre: "Taller de Desarrollo Personal I", abre: [] },
      { id: "r19", nombre: "Inglés Básico I", abre: [] },
    ],
  },
  {
    nombre: "IV Semestre",
    ramos: [
      { id: "r20", nombre: "Evaluación del Desarrollo de Competencias MEC FON HITO 1", abre: [] },
      { id: "r21", nombre: "Lenguaje y Sociedad", abre: ["r25", "r26"] },
      { id: "r22", nombre: "Fonoestamología", abre: ["r27"] },
      { id: "r23", nombre: "Fisiopatología de la Comunicación", abre: [] },
      { id: "r24", nombre: "Evaluación Participativa con la Comunidad", abre: ["r28"] },
      { id: "r25", nombre: "Taller de Desarrollo Personal II", abre: [] },
      { id: "r26", nombre: "Inglés Básico II", abre: [] },
    ],
  },
  {
    nombre: "V Semestre",
    ramos: [
      { id: "r27", nombre: "Valoración Auditiva en el Curso de Vida I", abre: ["r29"] },
      { id: "r28", nombre: "Desarrollo en Niños, Niñas y Adolescentes I", abre: ["r30"] },
      { id: "r29", nombre: "Desarrollo en el Adulto y Personas Mayores", abre: ["r31"] },
      { id: "r30", nombre: "Abordaje Fonoaudiológico en la Comunicación Educativa", abre: [] },
      { id: "r31", nombre: "Intervención Comunitaria", abre: [] },
      { id: "r32", nombre: "Ética y Salud", abre: [] },
    ],
  },
  {
    nombre: "VI Semestre",
    ramos: [
      { id: "r33", nombre: "Gestión e Innovación en Fonoaudiología", abre: ["r34"] },
      { id: "r34", nombre: "Abordaje en Niños, Niñas y Adolescentes I", abre: ["r35"] },
      { id: "r35", nombre: "Abordaje en Adultos y Personas Mayores I", abre: ["r36"] },
      { id: "r36", nombre: "Bases de la Rehabilitación y Redes Integradas de Servicio de Salud", abre: [] },
      { id: "r37", nombre: "Valoración Auditiva en el Curso de Vida II", abre: ["r38"] },
      { id: "r38", nombre: "Desarrollo de la Voz y Técnica Vocal", abre: ["r39"] },
      { id: "r39", nombre: "Electivo I", abre: [] },
    ],
  },
  {
    nombre: "VII Semestre",
    ramos: [
      { id: "r40", nombre: "Abordaje en Niños, Niñas y Adolescentes II", abre: ["r41"] },
      { id: "r41", nombre: "Abordaje en Adultos y Personas Mayores II", abre: ["r42"] },
      { id: "r42", nombre: "Electivo II", abre: [] },
      { id: "r43", nombre: "Abordaje Auditivo en el Curso de Vida", abre: ["r44"] },
      { id: "r44", nombre: "Abordaje de la Voz Hablada y Cantada I", abre: ["r45"] },
      { id: "r45", nombre: "Práctica Curricular I", abre: ["r46"] },
    ],
  },
  {
    nombre: "VIII Semestre",
    ramos: [
      { id: "r46", nombre: "Metodología de la Investigación", abre: ["r47"] },
      { id: "r47", nombre: "Abordaje de la Deglución y Alimentación Oral", abre: [] },
      { id: "r48", nombre: "Electivo III", abre: [] },
      { id: "r49", nombre: "Evaluación del Desarrollo de Competencias MEC FON HITO 2", abre: [] },
      { id: "r50", nombre: "Abordaje Vesicular en el Curso de Vida", abre: [] },
      { id: "r51", nombre: "Abordaje de la Voz Hablada y Cantada II", abre: [] },
      { id: "r52", nombre: "Práctica Curricular II", abre: [] },
    ],
  },
  {
    nombre: "IX Semestre",
    ramos: [
      { id: "r53", nombre: "Seminario de Grado I", abre: ["r54"] },
      { id: "r54", nombre: "Internado Profesional I", abre: [] },
      { id: "r55", nombre: "Internado Profesional II", abre: [] },
    ],
  },
  {
    nombre: "X Semestre",
    ramos: [
      { id: "r56", nombre: "Seminario de Grado II", abre: [] },
      { id: "r57", nombre: "Internado III", abre: [] },
      { id: "r58", nombre: "Internado IV", abre: [] },
    ],
  },
];

// Objeto para guardar qué ramos están aprobados
const aprobados = {};

// Función para renderizar la malla en el DOM
function renderizarMalla() {
  const container = document.querySelector(".malla");
  container.innerHTML = ""; // limpio

  semestres.forEach(semestre => {
    const semestreDiv = document.createElement("div");
    semestreDiv.classList.add("semestre");

    const titulo = document.createElement("h3");
    titulo.textContent = semestre.nombre;
    semestreDiv.appendChild(titulo);

    const ramosDiv = document.createElement("div");
    ramosDiv.classList.add("ramos");

    semestre.ramos.forEach(ramo => {
      const ramoDiv = document.createElement("div");
      ramoDiv.classList.add("ramo");
      ramoDiv.id = ramo.id;
      ramoDiv.textContent = ramo.nombre;
      ramosDiv.appendChild(ramoDiv);
    });

    semestreDiv.appendChild(ramosDiv);
    container.appendChild(semestreDiv);
  });
}

// Función para actualizar qué ramos están activos o inactivos según prerrequisitos y aprobados
function actualizarActivacion() {
  // Primero inactiva todos menos el primer semestre
  semestres.forEach((semestre, i) => {
    semestre.ramos.forEach(ramo => {
      const el = document.getElementById(ramo.id);
      if (i === 0) {
        el.classList.remove("inactivo");
      } else {
        el.classList.add("inactivo");
      }
    });
  });

  // Activa ramos que abre un ramo aprobado
  Object.keys(aprobados).forEach(idAprobado => {
    if (!aprobados[idAprobado]) return;

    const ramoAprobado = semestres
      .flatMap(s => s.ramos)
      .find(r => r.id === idAprobado);

    if (ramoAprobado && ramoAprobado.abre.length > 0) {
      ramoAprobado.abre.forEach(idAbre => {
        const elAbre = document.getElementById(idAbre);
        if (elAbre) {
          elAbre.classList.remove("inactivo");
        }
      });
    }
  });

  // Activa ramos sin prerrequisito en semestres > 0 si hay ramos activos en ese semestre
  semestres.forEach((semestre, i) => {
    if (i === 0) return;

    const algunoActivo = semestre.ramos.some(ramo => {
      const el = document.getElementById(ramo.id);
      return !el.classList.contains("inactivo");
    });

    if (algunoActivo) {
      semestre.ramos.forEach(ramo => {
        const el = document.getElementById(ramo.id);
        if (ramo.abre.length === 0) {
          el.classList.remove("inactivo");
        }
      });
    }
  });
}

// Maneja el click sobre un ramo para aprobar o desaprobar
function onClickRamo(event) {
  const ramoId = event.currentTarget.id;
  const ramoEl = event.currentTarget;

  // Ignora clicks en ramos inactivos
  if (ramoEl.classList.contains("inactivo")) return;

  // Toggle aprobado
  const aprobado = aprobados[ramoId];
  if (aprobado) {
    // Desaprobar
    aprobados[ramoId] = false;
    ramoEl.classList.remove("aprobado");
  } else {
    // Aprobar
    aprobados[ramoId] = true;
    ramoEl.classList.add("aprobado");
  }

  actualizarActivacion();
}

// Inicialización
function init() {
  renderizarMalla();
  actualizarActivacion();

  // Agregar evento click a cada ramo
  semestres.forEach(semestre => {
    semestre.ramos.forEach(ramo => {
      const el = document.getElementById(ramo.id);
      el.addEventListener("click", onClickRamo);
    });
  });
}

// Ejecutar al cargar
window.onload = init;
