//const compra = document.getElementById("compra")
let tipoEnvio = document.getElementById("tipoEnvio")
let envio1 = document.getElementById("envio1")
let envio2 = document.getElementById("envio2")
let envio3 = document.getElementById("envio3")
let selectMedio = document.getElementById("selectMedio")
let mediosDePago = document.getElementById("mediosDePago")
let pago1 = document.getElementById("pago1")
let pago2 = document.getElementById("pago2")
let pagoTransf = document.getElementById("pagoTransf")
let pagoCredNumeroCard = document.getElementById("credNumeroCard")
let pagoCredCVV = document.getElementById("credCVV")
let pagoCredFechaNac = document.getElementById("credFechaNac")
let tipoDeCambio = 40;
let usd = document.getElementById("USD") 
let uyu = document.getElementById("UYU")
let monedaFinal = document.getElementById("monedaFinal")

/*function cambioMoneda(articles){
    if(usd.checked){
        for (let i=0; i<articles.length; i++) {
            if(articles[i].currency == "UYU" ){
                articles[i].unitCost = articles[i].unitCost/tipoDeCambio;  
                monedaFinal.innerHTML = "USD"    
            }
        }
    }
    if(uyu.checked){
        for (let i=0; i<articles.length; i++) {
            if(articles[i].currency == "USD" ){
                articles[i].unitCost = articles[i].unitCost*tipoDeCambio  
                monedaFinal.innerHTML = "UYU"    
            }
        }   
    }
}*/

function subtotalPorArticulo(cantidad, precioUnitario, id){
     
    document.getElementById(id).innerHTML = precioUnitario*cantidad;
    subtotal();
    costoDeEnvio()

}

function subtotal(){
    let subtotal = 0;
    let totalArticulos = document.getElementsByClassName("totalArticulo");
    for (let i of totalArticulos) {
        subtotal += parseInt(i.innerHTML);
    }


    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("productCostText").innerHTML = subtotal;
}


function showCartProducts(info){
    
    let htmlContentToAppend = "";

    for(let i=0; i<info.length;i++){
        if (info[i].currency == "USD") {

            let subtotalArticulo = (parseInt(info[i].unitCost*40) * parseInt(info[i].count))
    
        htmlContentToAppend +=
        `<tr id="remove`+ i +`">
            <td class="text-center align-middle"> <img src="` + info[i].src + `" style="height:180px;"> </td>
            <td class="text-center align-middle">` + info[i].name + `</td>
            <td class="text-center align-middle">` + info[i].currency + ` ` + info[i].unitCost + `</td>
            <td class="text-center align-middle"><input type="number" min="1" value=` + info[i].count + ` class="cantidad" onchange="subtotalPorArticulo(this.value, `+ info[i].unitCost*40 + `, ` + i +`)"></td>
            <td class="text-center align-middle"><span>UYU </span><span class="totalArticulo" id="`+ i +`" >` + subtotalArticulo + `</span></td>
            <td class="text-center align-middle"><button type="button" id="eli`+ i +`" class="btn btn-dark" data-dismiss="modal">X</button></td>
        </tr>`
            
        }
        if (info[i].currency == "UYU") {

            let subtotalArticulo = (parseInt(info[i].unitCost) * parseInt(info[i].count))
    
            htmlContentToAppend +=
            `<tr id="remove`+ i +`">
                <td class="text-center align-middle"> <img src="` + info[i].src + `" style="height:180px;"> </td>
                <td class="text-center align-middle">` + info[i].name + `</td>
                <td class="text-center align-middle">` + info[i].currency + ` ` + info[i].unitCost + `</td>
                <td class="text-center align-middle"><input type="number" min="1" value=` + info[i].count + ` class="cantidad" onchange="subtotalPorArticulo(this.value, `+ info[i].unitCost + `, ` + i +`)"></td>
                <td class="text-center align-middle"><span>`+ info[i].currency + ` </span><span class="totalArticulo" id="`+ i +`" >` + subtotalArticulo + `</span></td>
                <td class="text-center align-middle"><button type="button" id="eli`+ i +`" class="btn btn-dark" data-dismiss="modal">X</button></td>            
            </tr>`
        }
    };
    document.getElementById("cart-articles").innerHTML += htmlContentToAppend;
};


//valida si tienen contenido los input del form o se estan seleccionados los radio buttons
function validar(){

    if(document.compra.calle.value == ""){
        document.getElementById("calleHidden").hidden = false;
        document.compra.calle.focus();
        return false;
    };

    if(document.compra.numero.value == ""){
        document.getElementById("nroHidden").hidden = false;
        document.compra.numero.focus();
        return false;
    };

    if(document.compra.esquina.value == ""){
        document.getElementById("esqHidden").hidden = false;
        document.compra.esquina.focus();
        return false;
    };

    if(document.compra.pais.value == ""){
        document.getElementById("paisHidden").hidden = false;
        document.compra.pais.focus();
        return false;
    };

    if( pago2.checked && pagoTransf.value == "1") {
        document.getElementById("medioHidden").hidden = false;
        selectMedio.focus();
        return false;
    };

    if( pago1.checked && (pagoCredNumeroCard.value == "" || pagoCredCVV.value == "" || pagoCredFechaNac.value == "")) {
        document.getElementById("medioHidden").hidden = false;
        selectMedio.focus();
        return false;
    };

    if (envio1.checked == false && envio2.checked == false && envio3.checked == false){
        document.getElementById("tipoHidden").hidden = false;
        envio1.focus();
        return false;

    };
    alert("¡Se ha realizado la compra con éxito! :)");
    return(true);
};


function costoDeEnvio(){
    let subEnFloat = parseFloat(document.getElementById('subtotal').innerHTML);
    let costoEnvio = 0;

    if (envio1.checked) {
        costoEnvio = parseInt(subEnFloat * parseFloat(envio1.value));
    }

    if(envio2.checked){
        costoEnvio = parseInt(subEnFloat * parseFloat(envio2.value));
    }

    if(envio3.checked){
        costoEnvio = parseInt(subEnFloat * parseFloat(envio3.value));
    }

    document.getElementById("comissionText").innerHTML = costoEnvio;
    document.getElementById("totalCostText").innerHTML = costoEnvio + subEnFloat;
   
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
            subtotal(); //aca llamo al subtotal para que me aparezca al cargar la pagina
            costoDeEnvio();

            let eliminar0 = document.getElementById("eli0")
            let eliminar1 = document.getElementById("eli1")
            let remove0 = document.getElementById("remove0")
            let remove1 = document.getElementById("remove1")
        
            eliminar0.addEventListener("click", (e) =>{
                while(remove0.firstChild){
                    remove0.removeChild(remove0.firstChild)
                }
                subtotal();
            });
        
            eliminar1.addEventListener("click", (e) =>{
                while(remove1.firstChild){
                    remove1.removeChild(remove1.firstChild)
                }
                subtotal();
            });
            
        }
    });


    //al inicio como pago tarjeta checked - transferencia disabled
    pagoTransf.disabled = true;
    //cambia los medios de pago a desabilitado cuando el otro radio button esta chequeado
    mediosDePago.addEventListener("change", (e) =>{
        if(pago1.checked){
            pagoTransf.disabled = true;
        }else{
            pagoTransf.disabled = false;
        }

        if(pago2.checked){
            pagoCredNumeroCard.disabled = true;
            pagoCredCVV.disabled = true;
            pagoCredFechaNac.disabled = true;
        }else{
            pagoCredNumeroCard.disabled = false;
            pagoCredCVV.disabled = false;
            pagoCredFechaNac.disabled = false;
        }
    });

});
    
