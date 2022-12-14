var art1 = {
  Nombre:
    "Análisis de la utilidad de los dispositivos garmin para los ciclistas de montaña en el cantón Santo Domingo",
  Autores: "Cañizares Galarza, Fredy Pablo,Intriago Hidalgo, Ubinter Alexander",
  Citacion: "",
  Pais: "Ecuador",
  Año: "2022",
  PalabrasClave: "TECNOLOGÍA DISPOSITIVO, FRECUENCIA CARDIACA",
  Url: "https://dspace.uniandes.edu.ec/handle/123456789/15080",
  Resumen:
    "El avance de la tecnología dirigida a facilitar la producción tanto en cantidad como en calidad en las diferentes actividades productivas; estos progresos científicos y tecnológicos vienen expresándose en el ámbito deportivo con la implementación de herramientas tecnológicas cuya finalidad es agilitar diversos procesos de control que se realizaban en forma manual; en el caso del ciclismo dicha recopilación de datos era poco efectiva, por tal razón, la vinculación de la tecnología con el ciclismo está desarrollándose de manera acelerada, obteniendo como finalidad el uso, manejo y protección de la información que genera cada ciclista de montaña durante los recorridos de entrenamiento, así como, en las diversas competencias. De esta manera, el análisis de la utilidad de los Dispositivos Garmin por los Ciclistas de Montaña tras las encuestas realizadas demostró que dicho dispositivo es el más completo ya que posee y recopila información necesaria para sus entrenamientos como son, cadencia (C), velocidad (V), distancia, GPS, desnivel, frecuencia cardiaca (FC), etc. El Dispositivo Garmin proporciona resultados fiables para el ciclista, ya que, tiene sensores precisos y específicos, los mismos que garantizan funciones tales como seguridad física, de red, informática y lógica siendo observables tanto en el Dispositivo Garmin como también sincronizando su celular con el aplicativo Garmin Connect.",
  Conclusiones: "",
  Notas: "",
};

var art2 = {
    Nombre:"Los recursos tecnológicos y su utilizacion durante la emergencia sanitaria covid-19 por la población del cantón pedro Vicente Maldonado",
    Autores:"Cañizares Galarza, Fredy Pablo, Gavilanes Gavilanez, William Ruben",
    Citacion: "",
    Pais: "Ecuador",
    Año: "2021",
    PalabrasClave:"RECURSO TECNOLÓGICO, EMERGENCIA SANITARIA",
    Url: "https://dspace.uniandes.edu.ec/handle/123456789/14305",
    Resumen:"En Ecuador, el cantón Pedro Vicente Maldonado ubicado en la provincia de Pichincha se ve afectado por la pandemia (covid-19), misma que nos transportó vivir una realidad totalmente diferente al pasado. En la investigación se desarrolla un estudio sobre el uso de los recursos tecnológicos dentro del cantón durante la emergencia sanitaria covid-19, el objetivo de la presente investigación es saber cuáles son las dificultes que tienes las personas para adaptase a la tecnología como una herramienta del diario vivir, con el propósito de mejorar todo este tipo de problemas. En el trabajo fueron encuestadas un total de 376 personas tanto de la zona urbana y la zona rural del cantón. Con la aplicación de la encuesta nos refleja un resultado negativo ante la adaptación a la tecnología ya sea porque no contaban con los servicios de internet, lugares de difícil acceso donde no existe ni señal de teléfono móvil, falta de conocimiento en el uso de una computadora y falta de recursos económicos para adquirir un equipo informático, se demuestra la existencia de una barrera que no permite una facilidad en el uso de las herramientas tecnológicas. Se propone que los resultados obtenidos sean usados por las autoridades del cantón, para sustentar dichas falencias tecnológicas.",
    Conclusiones:"",
    Notas:""
};

var art3 = {
    Nombre:"La seguridad informática en sistemas de gestión académica y educativa de las unidades educativas fiscales del cantón Santo Domingo",
    Autores: "Cañizares Galarza, Fredy Pablo, Calazacón Aguavil, Gretty Luciana",
    Citacion: "",
    Pais:"Ecuador",
    Año: "2021",
    PalabrasClave: "SEGURIDAD INFORMÁTICA, GESTIÓN ACADÉMICA",
    Url: "https://dspace.uniandes.edu.ec/handle/123456789/14303",
    Resumen: "Las instituciones educativas públicas en Ecuador representan el 75% de la oferta general, tienen la misión de garantizar el acceso y calidad de la educación inicial, básica, y bachillerato a todos los habitantes del territorio nacional. Para el año 2019 el MINEDUC estableció 12.409 unidades educativas fiscales en todo el país, para el caso de estudio, Santo Domingo de los Tsáchilas cuenta con 331. En las escuelas se utilizan sistemas de gestión como EducarEcuador, Siprofe, Carmenta. Que permiten realizar la gestión educativa, administrativa y de revisión para los educandos. La presente investigación tuvo como objetivo determinar la seguridad informática de los sistemas de gestión utilizados por las unidades educativas fiscales del cantón Santo Domingo, se conformó como no experimental cuantitativa, con una muestra no probabilística por conveniencia, con un enfoque descriptivo por la revisión a la bibliografía desde lo general a lo particular, se aplicó una encuesta semi estructurada a los responsables del área de TICS de 179 instituciones fiscales, dando como resultado principal que los niveles de seguridad informática de las unidades educativas están administradas por la central ubicada en la ciudad de Quito, siendo simplemente direccionada a través de los distritos educativos en función de lineamientos generales, en caso de colapso o ataques a los sistemas informáticos no intervienen los profesionales de Tics de las instituciones, siendo su principal problema además la seguridad de la información la cual en su mayoría produce perdidas de datos por la falta de protocolos de actuación y capacitación a los profesores.",
    Conclusiones:"",
    Notas:""
};

function leer() {
  if (localStorage.getItem("Articulos") == null) {
    let articulos = [];
    articulos.push(art1);
    articulos.push(art2);
    articulos.push(art3);
    localStorage.setItem("Articulos", JSON.stringify(articulos));
    location.reload()
  } else {
  let articulos = JSON.parse(localStorage.getItem("Articulos"));
  document.getElementById("tbody").innerHTML = "";
  for (let i = 0; i < articulos.length; i++) {
    let titulo = articulos[i].Nombre;
    let autores = articulos[i].Autores;
    let Citacion = articulos[i].Citacion;
    let Pais = articulos[i].Pais;
    let Año = articulos[i].Año;
    let PalabrasClave = articulos[i].PalabrasClave;
    let Url = articulos[i].Url;
    let Resumen = articulos[i].Resumen;
    let Conclusiones = articulos[i].Conclusiones;
    let Notas = articulos[i].Notas;

    document.getElementById("tbody").innerHTML += ` <tr>
        <td>${titulo}</td>
        <td>${autores}</td>
        <td><button><a onclick="verArt('${titulo}','${autores}','${Citacion}','${Pais}','${Año}','${PalabrasClave}','${Url}','${Resumen}','${Conclusiones}','${Notas}')" >Ver</a></button> <a href="#">Editar</a> <button><a onclick="artEliminar('${titulo}')">Eliminar</a></button></td>
      </tr>`;
  }
  }
}

function verArt(titulo,autores,Citacion,Pais,Año,PalabrasClave,Url,Resumen,Conclusiones,Notas){
    var art = { titulo,autores,Citacion,Pais,Año,PalabrasClave,Url,Resumen,Conclusiones,Notas }
    console.log("entre aca");
    if(localStorage.getItem("vista") == null){
        let revisados = []
        revisados.push(art)
        localStorage.setItem("vista",JSON.stringify(revisados))
      } else{
        let revisados = JSON.parse(localStorage.getItem("vista"))
        revisados.push(art)
        localStorage.setItem("vista",JSON.stringify(revisados))
      }
      window.location.href="/articulos/verArt"
}

const input = document.querySelector("#searchInput");
const userList = document.querySelector("#arts");
let users = [];


input.addEventListener("keyup", (e) => {
  const newUsers = users.filter((user) =>
    `${user.titulo.toLowerCase()}${user.autores.toLowerCase()}${user.botones.toLowerCase()}`.includes(
      input.value.toLowerCase()
    )
  );
  renderUsers(newUsers);
});

const createUsersItems = (users) =>
  users
    .map((user) => `<tr><td>${user.titulo}</td><td>${user.autores}</td><td> ${user.botones}</td></tr>`)
    .join(" ");

function renderUsers(users) {
  const itemsString = createUsersItems(users);
  userList.innerHTML = itemsString;
}

function artEliminar(Nombre){
    let eliminadop = {
      Nombre
    }
  
    if(localStorage.getItem("eliminados") == null){
      let u_eliminados = []
      u_eliminados.push(eliminadop)
      localStorage.setItem("eliminados",JSON.stringify(u_eliminados))
    } else{
      let u_eliminados = JSON.parse(localStorage.getItem("eliminados"))
      u_eliminados.unshift(eliminadop)
      localStorage.setItem("eliminados",JSON.stringify(u_eliminados))
    }
    eliminar()
  }

  function eliminar(){
    let articulos = JSON.parse(localStorage.getItem("Articulos"));
    let u_eliminados = JSON.parse(localStorage.getItem("eliminados"));
    for(let i = 0; i<articulos.length; i++){
      if(u_eliminados[0].Nombre != null &&  articulos[i].Nombre === u_eliminados[0].Nombre){
        articulos.splice(i,1);
        u_eliminados.splice(0,1);
      }
      
    }
    localStorage.setItem("Articulos",JSON.stringify(articulos));
    localStorage.setItem("eliminados",JSON.stringify(u_eliminados));
    
    console.log("Artículo Eliminado Correctamente")
    leer()
  }


//leer()




