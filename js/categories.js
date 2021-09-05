const ORDER_ASC_BY_NAME = "AZ";//constante ascende
const ORDER_DESC_BY_NAME = "ZA"; //constante descendente
const ORDER_BY_PROD_COUNT = "Cant.";//constante por cant. vendidos
var currentCategoriesArray = []; //arreglo vacio
var currentSortCriteria = undefined; //variables indefinidas
var minCount = undefined;
var maxCount = undefined;
var buscar = document.getElementById("buscar");

//agrego evento que toma valor de las teclas
buscar.addEventListener("keyup", (event) => 
    {
        var valorIngresado = event.target.value.toLowerCase();//guardo el valor de las teclas presionadas en minuscula
        var categoriasFiltradas = currentCategoriesArray.filter((categoria) => {
          return (
              categoria.name.toLowerCase().includes(valorIngresado) || 
              categoria.description.toLowerCase().includes(valorIngresado)
          );
        }) //recorro el arreglo de categorias y guardo filtrados las categorias que incluyen en nombre o descripcion los letras presionadas
        sortAndShowCategories (ORDER_ASC_BY_NAME, categoriasFiltradas); //llamo funcion pasando parametro solo productos filtrados   
    });

function sortCategories(criteria, array){ 
    let result = [];//arreglo vacio
    if (criteria === ORDER_ASC_BY_NAME) //si el criterio que elegiste es ascendente alfbetico entonces
    {
        result = array.sort(function(a, b) {   //arreglo de categorias alfabetico ascendente
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){  //si el criterio es descendente alfabetico 
        result = array.sort(function(a, b) {    //arreglo de categorias alfabetico descendente
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){ // si el criterio es por cantidad de articulos 
        result = array.sort(function(a, b) {    //del que tiene mas articulos al menos
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result; //retorna arreglo con el criterio seleccionado
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">`+ category.name +`</h3>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });

    
});


