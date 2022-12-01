document.getElementById("formularioL").addEventListener("submit", ingresar);

//Agrega Empleados
function ingresar(e) {
  email = document.getElementById("emailL").value;
  password = document.getElementById("passwordL").value;

  let valido = false

  if (localStorage.getItem("Usuarios") == null) {
    alert("Usuario no existe, por favor regístrese")
  }
  else{
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    for(let i = 0; i<usuarios.length && !valido; i++){
        if(email == usuarios[i].email && password == usuarios[i].password)
        valido = true;
    }
    if(valido){
        window.location.href="views/inicio.html";
    }else{
        alert("Usuario y/o contraseña inválidos, revise nuevamente.")
    }
  }

  console.log("Usuario Logueado Correctamente");
  document.getElementById("formularioL").reset();
  e.preventDefault();
}
