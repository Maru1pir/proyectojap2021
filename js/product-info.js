
let str = '<span class="fa fa-star checked"></span>'
let str2 = '<span class="fa fa-star"></span>'
var addComment = [];
let user = JSON.parse(localStorage.getItem("user"))

//funcion que inserta caificacion en forma de estrellas
function calificacionEstrellas(numeroEstrellas){

    let html="";
   
    html += str.repeat(parseInt(numeroEstrellas));
    html += str2.repeat(parseInt((5 - numeroEstrellas)));
   
    return html;
}

//inserta un carrusel de imagenes de ina lista
function carrusel(lista){

    let html2 = `<div class="carousel-item active">
    <img src="` + lista[0] + `" class="d-block w-100" alt="...">
    </div>;`

    for (let i=1; i<lista.length; i++){

        html2 +=      
            `<div class="carousel-item">
                <img src="` + lista[i] + `" class="d-block w-100" alt="...">
            </div>`
    }
    return html2
}

//funcion que agrega el contenido del producto a pagina 
function showProductInfo(info){

    let htmlContentToAppend =  
        `<br>
        <div class="container container-fluid">
            <h1 class="display-1 font-weight-bolder text-center">` + info.name + `</h1>
            <br>
            <h4 class="text-justify"  style="line-height: 1.6;"> `+ info.description + `</h4>
        </div>
        <br>
        <div class="fullImage">
            <img src="img/onix.jpeg" style="width:100%;">
            <div class="content">
                <h1 class="display-4 font-weight-bold"> Desde: ` + info.currency + ` ` + info.cost + ` + IVA</h1>
                <br>
                <h4>Consulte por planes de financiación hasta 12 cuotas SIN RECARGO</h4>
                <h6>` + info.soldCount + ` unidades vendidas<h6>
                <br>
            </div>
        </div>
        <br><br><br>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 class="card-title text-center font-weight-bold">Se integra a tu vida</h4>
                    <p class="card-text text-justify" style="text-indent: 40px;">Manejar el Onix es vivir una experiencia inédita por su diseño, tecnología y confort. Contás con conectividad total y soluciones innovadoras, como conexión Wi-Fi propia y computadora de abordo. Y, además, un motor turbo de alto rendimiento, preparado para superar las expectativas de los más exigentes.</p>
                </div>
                <div class="col">
                    <h4 class="card-title text-center font-weight-bold">Diseño sin renunciar a la comodidad</h4>
                    <p class="card-text text-justify" style="text-indent: 40px;">Diseño moderno con llantas de aleación de 16” y parrilla frontal cromada, en el Chevrolet Onix podés llegar a cualquier lugar con estilo: Faros delanteros tipo proyector, luz de conducción diurna tipo LED, luces traseras LED, volante deportivo con revestimiento premium y asiento trasero bi-split.</p>
                </div>
            </div>
        </div>
        <br><br><br>
        <div id="carouselExampleFade" class="carousel slide carousel-fade container container-fluid" data-ride="carousel">
            <div class="carousel-inner">`
             + carrusel(info.images) +    
            `</div>
            <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <br><br><br>`

    document.getElementById("productInfo").innerHTML = htmlContentToAppend;

}

//funcion para insertar los comentarios en la pagina
function showComments(info){

    let htmlContentToAppend2 = "";
    for(let i=0; i < info.length; i++){

        htmlContentToAppend2 += 
        `<div class="d-flex justify-content-between align-items-center"> 
            <h6 class="font-weight-bold text-primary mb-1">`+ info[i].user +`</h6>
            <p class="text-muted mb-0">` + info[i].dateTime + `</p>
        </div>
        <div>` 
            + calificacionEstrellas(info[i].score) +
        `</div>
        <div>    
            <p class="mt-3 mb-4 pb-2">` + info[i].description  + `</p>
        </div><hr>`
        
        }

    document.getElementById("comments").innerHTML += htmlContentToAppend2;

}

//funcion que toma numero de estrellas seleccionadas en caja de comentarios
function starValue(){

    var i 
    for (i=0; i < document.estrellas.star.length; i++){
        if(document.estrellas.star[i].checked){
            break;
        }
    }
    let starValueChecked = parseInt(document.estrellas.star[i].value);
    return starValueChecked;
}

//funcion de darle formato al comentario como los anteriores, mostrando fecha actual y nombre de usuario
function newComment(){
    let fecha = new Date();
    let formatoFecha = fecha.getFullYear().toString() + "-" + (fecha.getMonth() + 1).toString().padStart(2, '0') + "-" + fecha.getDate().toString().padStart(2, '0') + ` ` + fecha.getHours().toString() + `:` + fecha.getMinutes().toString() + `:` + fecha.getSeconds().toString()
    comentario = {
        description: document.getElementById("textArea").value,
        dateTime: formatoFecha,
        score: starValue(),
        user: user.usuario,
    } 
    addComment.push(comentario);   
    showComments(addComment); 
    addComment.pop(comentario);

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    //llamo la informacion del producto
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showProductInfo(resultObj.data);  
        }

    });

    //llamo la informacion de los comentarios
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj2){
        if (resultObj2.status === "ok")
        {
            showComments(resultObj2.data);
        }
    });

    formulario2.addEventListener("submit", function(event){

        event.preventDefault();
        newComment();
        document.getElementById("formularioStars").reset();
        document.getElementById("formularioTextArea").reset()
    });

});



          