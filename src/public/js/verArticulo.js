

function verArticulo(){
    let articulos = JSON.parse(localStorage.getItem("vista"));
  document.getElementById("articulo").innerHTML = "";
  
    let titulo = articulos[(articulos.length-1)].titulo;
    let autores = articulos[(articulos.length-1)].autores;
    let Citacion = articulos[(articulos.length-1)].Citacion;
    let Pais = articulos[(articulos.length-1)].Pais;
    let Año = articulos[(articulos.length-1)].Año;
    let PalabrasClave = articulos[(articulos.length-1)].PalabrasClave;
    let Url = articulos[(articulos.length-1)].Url;
    let Resumen = articulos[(articulos.length-1)].Resumen;
    let Conclusiones = articulos[(articulos.length-1)].Conclusiones;
    let Notas = articulos[(articulos.length-1)].Notas;

    document.getElementById("articulo").innerHTML += ` 
    <div class="form-group">
    <label for="input"><b>Titulo del Articulo</b></label>
    <p id="titulo" name="titulo">${titulo}</div>
<div class="form-group">
    <label for="input"><b>Autores </b></label>
    <p id="autores" name="autores">${autores}</div>
<div class="form-group">
    <label for="input"><b>Citacion </b></label>
    <p id="citacion" name="citacion">${Citacion}</div>
<div class="form-group">
    <label for="input"><b>Pais </b></label>
    <p id="pais" name="pais">${Pais}</div>
<div class="form-group">
    <label for="input"><b>Año </b></label>
    <p id="año" name="año">${Año}</div>
<div class="form-group">
    <label for="input"><b>Palabras clave </b></label>
    <p id="pC" name="pC">${PalabrasClave}</div>
<div class="form-group">
    <label for="input"><b>Url </b></label>
    <p id="url" name="url">${Url}</div>
<div class="form-group">
    <label for="input"><b>Resumen </b></label>
    <p id="resumen" name="resumen">${Resumen}</div>
<div class="form-group">
    <label for="input"><b>Conclusiones </b></label>
    <p id="conclusiones" name="conclusiones">${Conclusiones}</div>
<div class="form-group">
    <label for="input"><b>Notas </b></label>
    <p id="notas" name="notas">${Notas}</div>    
</div>
    `;
  
}

verArticulo()