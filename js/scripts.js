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

  alumnos.forEach(function(a) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${a.nombre}</td>
      <td>${a.apellido}</td>
      <td>${a.edad}</td>
      <td>${a.curso}</td>
    `;

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