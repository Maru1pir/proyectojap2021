const ORDER_ASC_BY_PRICE = "MENORAMAYOR";//constante ascende
const ORDER_DESC_BY_PRICE = "MAYORAMENOR"; //constante descendente
const ORDER_DESC_BY_SOLD_COUNT = "Relevancia";//constante por cant. vendidos
var currentProductsArray = []; //arreglo vacio
var currentSortCriteria = undefined; //variables indefinidas
var minPrice = undefined;
var maxPrice = undefined;
var buscar = document.getElementById("buscar");

//agrego evento que toma valor de las teclas
buscar.addEventListener("keyup", (event) => 
    {
        var valorIngresado = event.target.value.toLowerCase(); //guardo el valor de las teclas presionadas en minuscula
        var productosFiltradas = currentProductsArray.filter((producto) => {
          return (
              producto.name.toLowerCase().includes(valorIngresado) || 
              producto.description.toLowerCase().includes(valorIngresado)
          );
        })  //recorro el arreglo de productos y guardo filtrados los productos que incluyen en nombre o descripcion los letras precionadas
        sortAndShowProducts (ORDER_ASC_BY_PRICE, productosFiltradas); //llamo funcion pasando parametro solo productos filtrados   
    });

function sortProducts(criteria, array){ 
    let result = [];//arreglo vacio
    if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {   //arreglo de categorias precio de menor a mayor
            let aPrice = parseInt(a.cost)
            let bPrice = parseInt(b.cost)
            
            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){   
        result = array.sort(function(a, b) {    //arreglo de categorias precio mayor a menor
            let aPrice = parseInt(a.cost)
            let bPrice = parseInt(b.cost)
            
            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;


        });
    }else if (criteria === ORDER_DESC_BY_SOLD_COUNT){ // si el criterio es por cantidad de vendidos
        result = array.sort(function(a, b) {    //del que tiene mas vendidos al menos
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }

    return result; //retorna arreglo con el criterio seleccionado
}


function showProductsList(){

    let htmlContentToAppend = "";
    for(let i=0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

            htmlContentToAppend += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <a href="product-info.html" class="list-group-item list-group-item-action h-100">
                    <div><img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail"></div>
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">`+ product.name +`</h3>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    
                    <p class="mb-1">` + product.description + `</p>
                    <br>
                    <h4 class="mb-1">` + product.currency + ` ` + product.cost + `</h4>
                </a>
            </div>` 
        }

        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
//llamamos a la funcion getJASONDATA, que se encuentra en el init y le pasamos la URL de productos
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });

    document.getElementById("sortPriceDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortPriceAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    
    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });

});

  