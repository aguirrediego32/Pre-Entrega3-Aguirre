document.getElementById("agregarAlumno")
  .addEventListener("click", cargarAlumno);

function cargarAlumno() {
  const KEY_ALUMNOS = "alumnos123";
  const ALUMNOS_STR = localStorage.getItem(KEY_ALUMNOS);
  const ALUMNOS = (ALUMNOS_STR && JSON.parse(ALUMNOS_STR)) || [];
  let alumnoNuevo = obtenerDatosAlumno();
  
  alumnoNuevo.id = ALUMNOS.length + 1;
  ALUMNOS.push(alumnoNuevo);

  localStorage.setItem(KEY_ALUMNOS, JSON.stringify(ALUMNOS));
  window.location.href = "index.html";
}

function obtenerDatosAlumno() {
  let nombre = document.getElementById("nombreInput").value;
  let apellido = document.getElementById("apellidoInput").value;
  let nota1 = document.getElementById("nota1Input").value;
  let nota2 = document.getElementById("nota2Input").value;
  let nota3 = document.getElementById("nota3Input").value;
          
  return {
    nombre,
    apellido,
    nota1,
    nota2,
    nota3
  };
}
