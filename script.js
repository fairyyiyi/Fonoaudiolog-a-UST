document.querySelectorAll(".ramo").forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("clicked");

    const nombre = el.textContent;
    const aprobado = el.classList.contains("clicked");
    localStorage.setItem(nombre, aprobado);
  });

  // restaurar estado guardado
  const nombre = el.textContent;
  const guardado = localStorage.getItem(nombre);
  if (guardado === "true") {
    el.classList.add("clicked");
  }
});
