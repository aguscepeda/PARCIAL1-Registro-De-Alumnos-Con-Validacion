//seleccionar elementos
const form = document.getElementById("formularioRegistro");
const lista = document.getElementById("listaAlumnosRegistrados");
const total = document.getElementById("totalAlumnos");

//array en memoria (es temporal, se pierde al recargar la página)
// let alumnos = [];

//guardar en localStorage
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];

//funcion para mostrar alumnos
function mostrarAlumnos() {
  lista.innerHTML = ""; // limpiar

  alumnos.forEach(function(a, index) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${a.nombre}</td>
      <td>${a.apellido}</td>
      <td>${a.edad}</td>
      <td>${a.curso}</td>
    `;

    // Crear la celda y el boton de eliminar
    const celdaAccion = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn-eliminar";

    // La logica para borrar el alumno
    btnEliminar.addEventListener("click", function() {
        alumnos.splice(index, 1);
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        mostrarAlumnos();
    });

    // Agregar el boton a la fila
    celdaAccion.appendChild(btnEliminar);
    fila.appendChild(celdaAccion);

    // Agregar la fila a la tabla
    lista.appendChild(fila);
  });

  total.textContent = alumnos.length;
}


//evento submit
form.addEventListener("submit", function(e) {
  e.preventDefault(); // evitar recarga

  //tomar datos del formulario
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const curso = document.getElementById("curso").value;

  //crear objeto alumno
  const alumno = {
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    curso: curso
  };

  if (!nombre || !apellido || !curso) {
    document.getElementById("mensajeError").textContent = "Todos los campos son obligatorios.";
    return;
  }

  //guardar en array
  alumnos.push(alumno);

  //guardar en localStorage
  localStorage.setItem("alumnos", JSON.stringify(alumnos));

  //mostrar en pantalla
  mostrarAlumnos();

  //limpiar formulario
  form.reset();
});

//mostrar al cargar la página
mostrarAlumnos();