const formulario = document.getElementById("formulario");
const usuario = document.getElementById("floatingInput");
const contrasena = document.getElementById("floatingPassword");
const usernav = document.getElementById("usernav");
const salir = document.getElementById("salir");


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    formulario.addEventListener("submit", function(event){
        event.preventDefault(); //evita que llame a la funcion predefinida por el submit
        //crea arreglo que guarda usuarios y contrasenas ingresadas
        let users = Array(
            {
                usuario: usuario.value,
                contrasena: contrasena.value
            }
        );
        //Guardar los usuarios y contrasenia localmente, como solo recibe string hay que convertir array a string
        sessionStorage.setItem("user",JSON.stringify(users));
        //Redireccionar a la pagina de inicio
        window.location.href="index.html"
    });
 

});

