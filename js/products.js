//me falta comentar este codigo...
function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i=0; i<array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ product.name +`</h3>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                    <h4 class="mb-1">` + product.currency + ` ` + product.cost + `</h4>
                </div>
            </div>
        </a>` 

    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
//llamamos a la funcion getJASONDATA, que se encuentra en el init y le pasamos la URL de productos
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showProductsList(resultObj.data);
        }
    });

    showProductsList();
});

  