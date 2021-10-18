const tipoDeCambio = 40;

function moneda(articles){
    if(document.getElementById("USD").checked = true){
        for (let i=0; i<articles.lengt; i++) {
            if(articles[i].currency == "UYU" ){
                articles[i].unitCost = articles[i].unitCost/tipoDeCambio;      
            }
        }
    }
    if(document.getElementById("UYU").checked = true){
        for (let i=0; i<articles.lengt; i++) {
            if(articles[i].currency == "USD" ){
                articles[i].unitCost = articles[i].unitCost*tipoDeCambio      
            }
        }   
    }
}

function subtotalPorArticulo(cantidad, precioUnitario, id){
     
    document.getElementById(id).innerHTML = precioUnitario*cantidad;
}

function subtotal(){
    let subtotal = 0;
    let totalArticulos = document.getElementsByClassName("totalArticulo");
    for (let i of totalArticulos) {
        subtotal += parseInt(i.innerHTML);
    }

    document.getElementById("subtotal").innerHTML = subtotal;
}

function showCartProducts(info){

    let htmlContentToAppend = "";
    for(let i=0; i<info.length;i++){
        
        let subtotalArticulo = (parseInt(info[i].unitCost) * parseInt(info[i].count))
    
    
        htmlContentToAppend +=
        `<tr>
            <td class="text-center align-middle"> <img src="` + info[i].src + `" style="height:180px;"> </td>
            <td class="text-center align-middle">` + info[i].name + `</td>
            <td class="text-center align-middle">` + info[i].currency + ` ` + info[i].unitCost + `</td>
            <td class="text-center align-middle"><input type="number" min="1" value=` + info[i].count + ` class="cantidad" onchange="subtotalPorArticulo(this.value, `+ info[i].unitCost + `, ` + i +`)"></td>
            <td class="text-center align-middle"><span>`+ info[i].currency + ` </span><span class="totalArticulo" id="`+ i +`" >` + subtotalArticulo + `</span></td>
        </tr>`


    }
    document.getElementById("cart-articles").innerHTML += htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
     //llamo la informacion del carrito
     getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showCartProducts(resultObj.data.articles); 
            subtotal();
        }
    });

});