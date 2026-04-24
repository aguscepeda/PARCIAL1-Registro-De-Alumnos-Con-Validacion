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


  // validacion para que obligatoriamente se llenen todos los campos
  if (!nombre || !apellido || !curso) {
    document.getElementById("mensajeError").textContent = "Todos los campos son obligatorios.";
    return;
  }

//validacion para que en nombre no se pueda poner un numero
  for (let i = 0; i < nombre.length; i++) {
    if (!isNaN(nombre[i]) && nombre[i] !== " ") {
      document.getElementById("mensajeError").textContent =  "El nombre no puede contener números.";
        return;
    }
}

//validacion para que en apellido no se pueda poner un numero
for (let i = 0; i < apellido.length; i++) {
    if (!isNaN(apellido[i]) && apellido[i] !== " ") {
        document.getElementById("mensajeError").textContent = "El apellido no puede contener números.";
        return;
    }
}

// validacion para que la edad sea solo un numero, una edad real y que no este vacio.
  const edadNum = Number(edad);
  if (!edad || isNaN(edadNum) || !Number.isInteger(edadNum) || edadNum < 1 || edadNum > 120) {
    document.getElementById("mensajeError").textContent = "La edad debe ser un número entero entre 1 y 120.";
    return;
  }

  //limpia el mensaje de error, si el usuario ingreso todo bien.
document.getElementById("mensajeError").textContent = "";

 //crear objeto alumno
  const alumno = {
    nombre: nombre,
    apellido: apellido,
    edad: edadNum,
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