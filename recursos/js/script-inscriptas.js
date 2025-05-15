let materiasIncriptas = [];
let materias = [];

async function obtenerMaterias() {
  try {
    const response = await fetch("../recursos/data/materias.json");
    if (!response.ok) {
      throw new Error("Error mensaje" + response.status);
    }
    const data = await response.json();
    materias = data;
    mostrarMateriasInscriptas();
  } catch (error) {
    console.error("Error en la carga de las materias");
  }
}

obtenerMaterias();

function mostrarMateriasInscriptas() {
  materiasIncriptas = materias.filter((materia) => materia.estaInscripto);
  const section = document.getElementById("container-materias-inscriptas");
  section.innerHTML = "";
  crearHTMLMaterias(materiasIncriptas, section, "inscripta");
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
        </div>`;

    etiqueta.appendChild(card);
  });
}
