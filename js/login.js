const formulario = document.getElementById("formulario");
const usuario = document.getElementById("floatingInput");
const contrasena = document.getElementById("floatingPassword");

/*let textoIngresadoUsuario = document.getDocumentById("userName");
    textoIngresadoUsuario.addEventListener("keydown", (event) => {
    console.log(`key=${event.key},code=${event.code}`);
});*/

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    formulario.addEventListener("submit", function(event){
        let users = {
            usuario: usuario.value,
            contrasena: contrasena.value
        }
        event.preventDefault(); //evita que llame a la funcion predefinida por el submit
        //Guardar los usuarios y contrasenia localmente, como solo recibe string hay que convertir array a string
        localStorage.setItem("user",JSON.stringify(users));
        //Redireccionar a la pagina de inicio
        window.location.href="index.html"
    });
 
});

