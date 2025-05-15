let materiasRecomendas = [];
let materiasDisponibles = [];
let materias = [];

fetch("../recursos/data/materias.json")
  .then((res) => res.json())
  .then((data) => {
    materias = data;
    mostarMateriasDisponibles();
    mostrarMateriasRecomendadas();
  });

function mostarMateriasDisponibles() {
  materiasDisponibles = materias.filter(
    (materia) =>
      !materia.estaInscripto && materia.cupo > materia.cantidadDeInscriptos
  );
  const section = document.getElementById("container-materias-disponibles");
  section.innerHTML = "";
  crearHTMLMaterias(materiasDisponibles, section, "disponible");
}

function mostrarMateriasRecomendadas() {
  materiasRecomendas = materias.filter(
    (materia) =>
      !materia.estaInscripto &&
      materia.cupo > materia.cantidadDeInscriptos &&
      materia.esRecomendada
  );
  const section = document.getElementById("container-materias-recomendadas");
  section.innerHTML = "";
  crearHTMLMaterias(materiasRecomendas, section, "recomendada");
}


function formatearCuatrimestre(cuatrimestre) {
  const arrText = cuatrimestre.split("/");
  return `${arrText[0]}º Cuatrimestre del ${arrText[1]}`;
}

function crearHTMLMaterias(materias, etiqueta, tipoId) {
  materias.forEach((materia) => {
    const cuatrimestreText = formatearCuatrimestre(materia.cuatrimestre);
    const card = document.createElement("article");
    card.className = "card";
    card.id = `materia_${tipoId}_${materia.id}`;
    card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${materia.nombre}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            ${cuatrimestreText}
          </h6>
          <p class="card-text">${materia.descripcion}</p>
            <button class="card-link inscribirse btn btn-primary" data-id="${materia.id}" data-nombre="${materia.nombre}">Inscribirse</button>
        </div>`;
    const boton = card.querySelector("button");
    boton.addEventListener("click", () =>
      inscribirseMateria(materia.id, materia.nombre)
    );

    etiqueta.appendChild(card);
  });
}

function inscribirseMateria(id, nombre) {
  const materiaDis = document.getElementById("materia_disponible_" + id);
  const materiaRecomendada = document.getElementById(
    "materia_recomendada_" + id
  );
  if (materiaDis) {
    alert("Te inscribiste en la materia " + nombre);
    materiaDis.style.display = "none";
  }
  if (materiaRecomendada) {
    alert("Te inscribiste en la materia " + nombre);
    materiaRecomendada.style.display = "none";
  }
}
