document.getElementById("formulario").addEventListener("submit", crear);

//Agrega Empleados
function crear(e){
  Nombre = document.getElementById("titulo").value
  Autores = document.getElementById("autores").value
  Citacion = document.getElementById("citacion").value
  Pais = document.getElementById("pais").value
  Año = document.getElementById("año").value
  PalabrasClave = document.getElementById("pC").value
  Url = document.getElementById("url").value
  Resumen = document.getElementById("resumen").value
  Conclusiones = document.getElementById("conclusiones").value
  Notas = document.getElementById("notas").value

  let articulo = {
    Nombre,
    Autores,
    Citacion,
    Pais,
    Año,
    PalabrasClave,
    Url,
    Resumen,
    Conclusiones,
    Notas
  }

  if(localStorage.getItem("Articulos") == null){
    let articulos = []
    articulos.push(articulo)
    localStorage.setItem("Articulos",JSON.stringify(articulos))
  } else{
    let articulos = JSON.parse(localStorage.getItem("Articulos"))
    articulos.push(articulo)
    localStorage.setItem("Articulos",JSON.stringify(articulos))
  }

  
  document.getElementById("formulario").reset();
  e.preventDefault();
  console.log("Articulo Guardado Correctamente")
  e.preventDefault()
  window.location.href="/articulos"
}
