document.getElementById("formularioR").addEventListener("submit", crear);

//Agrega Empleados
function crear(e) {
  email = document.getElementById("emailR").value;
  nombre = document.getElementById("nombreR").value;
  pais = document.getElementById("paisR").value;
  entidad = document.getElementById("entidadR").value;
  password = document.getElementById("passwordR").value;

  let usuario = {
    email,
    nombre,
    pais,
    entidad,
    password,
  };

  if (localStorage.getItem("Usuarios") == null) {
    let usuarios = [];
    usuarios.push(usuario);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));
  } else {
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    usuarios.push(usuario);
    localStorage.setItem("Usuarios", JSON.stringify(usuarios));
  }
  console.log("Usuario Guardado Correctamente");
  document.getElementById("formularioR").reset();
  e.preventDefault();
  window.location.href="../index.html";
}
