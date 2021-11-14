const primerNombre = document.getElementById("primerNombre");
const segundoNombre = document.getElementById("segundoNombre");
const primerApellido = document.getElementById("primerApellido");
const segundoApellido = document.getElementById("segundoApellido");
const mail = document.getElementById("mail");
const tel = document.getElementById("tel");
const img = document.getElementById("img");
const edad = document.getElementById("edad")
const browser = document.getElementById("browser")
const guardarPerfil = document.getElementById("perfil");

browser.addEventListener("change", (e) =>{
  let image = browser.files[0];
  let reader = new FileReader();

  if(image){
    reader.readAsDataURL(image)
  }
  reader.onloadend = function(){
    img.src = reader.result;
  }

});

guardarPerfil.addEventListener("submit", function(event){
  let perfil = {
    primerNombre: primerNombre.value,
    segundoNombre: segundoNombre.value,
    primerApellido: primerApellido.value,
    segundoApellido: segundoApellido.value,
    mail: mail.value,
    tel: tel.value,
    edad: edad.value,
    img: img.src,
  }
  event.preventDefault(); //evita que llame a la funcion predefinida por el submit
  //Guardar los usuarios y contrasenia localmente, como solo recibe string hay que convertir array a string
  localStorage.setItem("profile", JSON.stringify(perfil));
  alert("Perfil actualizado")
});

function perfilLocal(){
  let perfilGuardado = JSON.parse(localStorage.getItem("profile"));
  if(perfilGuardado != null){
    primerNombre.value = perfilGuardado.primerNombre;
    segundoNombre.value = perfilGuardado.segundoNombre;
    primerApellido.value = perfilGuardado.primerApellido;
    segundoApellido.value = perfilGuardado.segundoApellido;
    mail.value = perfilGuardado.mail;
    tel.value = perfilGuardado.tel;
    edad.value = perfilGuardado.edad;
    img.src = perfilGuardado.img;
  }
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  perfilLocal()
 
});
