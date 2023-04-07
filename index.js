const KEY_ALUMNOS = "alumnos123";
const ALUMNOS_STR = localStorage.getItem(KEY_ALUMNOS);
let alumnos = (ALUMNOS_STR && JSON.parse(ALUMNOS_STR)) || [];

document.getElementById("borrarTodosAlumnos").addEventListener("click",borrarTodosAlumnos)

let contenedorAlumnosAprobados = document.getElementById(
  "contenedor-alumnos-aprobados"
);

let contenedorAlumnosDesaprobados = document.getElementById(
  "contenedor-alumnos-desaprobados"
);


function borrarAlumno(id){
  const new_alumnos = alumnos.filter((unAlumno) => unAlumno.id != id); //si el id del alumno es igual al que tengo por parametro lo quito
  localStorage.setItem(KEY_ALUMNOS, JSON.stringify(new_alumnos));
  alumnos = new_alumnos
  pintar()
}


function promedio(alumno) {
  return (parseInt(alumno.nota1) + parseInt(alumno.nota2) + parseInt(alumno.nota3)) / 3;
}

function estaAprobado(alumno) {
  return promedio(alumno) >= 7;
}

function pintar(){
  const alumnoAprobados = alumnos.filter((unAlumno) => estaAprobado(unAlumno));
  const alumnoDesaprobados = alumnos.filter(
    (unAlumno) => !estaAprobado(unAlumno)
  );

  verAlumnos(alumnoAprobados,contenedorAlumnosAprobados)
  verAlumnos(alumnoDesaprobados,contenedorAlumnosDesaprobados)
}

pintar()


function borrarTodosAlumnos() {
  if (confirm("Se borrara todo el historial, desea proceder?") == true) {
    alumnos = []
    localStorage.clear()
    pintar()
  } else {
    userPreference = "Save Cancelled!"; 
  }

}


function verAlumnos(alumnosActuales, contenedorAlumnos) {

 contenedorAlumnos.innerHTML = ""

  for (const alumno of alumnosActuales) {
    let column = document.createElement("div");

    column.className = "col-md-4 mt-3";
    column.id = `columna-${alumno.id}`;
    column.innerHTML = `
      <div class="card">
        <div class="card-body">
          <p class="card-text">Nombre: <b>${alumno.nombre}</b></p>
          <p class="card-text">Apellido: <b>${alumno.apellido}</b></p>
          <p class="card-text">Promedio: <b>${promedio(alumno)}</b></p>
          <button onclick="borrarAlumno(${alumno.id})">Borrar</button>
        <div>  
      </div>
    `;

    contenedorAlumnos.append(column);
  }
}