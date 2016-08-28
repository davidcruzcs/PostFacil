
//---------------------------variables------------------------------------------

var nUrls = 0;

//---------------------------funciones------------------------------------------
function call() {
  var x = new Array(nUrls);
  for(var i = 0; i <= nUrls ; i++){ x.push("url"+i); }
  //creo una funcion asincronica por cada elemento del array para no perder
  // el scope de la variable que guarda la url
  x.forEach(function(object, i){
    var url = document.getElementById(object).value;
    var reqURL = processURL(url);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        // --------    200 OK   -------
        var salida = JSON.parse(xhttp.responseText);
        var estadoProd = salida.condition == "new" ? "nuevo" : "usado";
        var newHTML = "<center><h1>" + salida.title + "</h1><center>";
        newHTML += "<span>precio: "+ salida.currency_id + " " + salida.price + "</span><br>";
        newHTML += "<span>estado: "+ estadoProd + "</span><br>";
        newHTML += "<span><a href='"+salida.permalink+"'> Mercadolibre </a></span><br>";
        newHTML += "<img src='"+salida.thumbnail+"'><br>";
        var images = salida.pictures;
        for(var i=0; i < images.length; i++){
          var image = images[i];
          var url = image.url;
          newHTML += "<img src='"+url+"'>";
        }
        getDescription(reqURL+"/descriptions", newHTML);
      }
    };
    xhttp.open("GET", reqURL, true);
    xhttp.send();
  });
}

function getDescription(reqURL, post) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var salida = JSON.parse(xhttp.responseText)[0];
      var newHTML = salida.text;
      newHTML = post + newHTML;
      $("#previewSection").append(newHTML);
    }
  }
  xhttp.open("GET", reqURL, true);
  xhttp.send();
}


function processURL (url){
  var subUrl = url.split("mercadolibre.com.co/")[1].split("-");
  var mlObjId = "" +  subUrl[0] + "" + subUrl[1];
  return "https://api.mercadolibre.com/items/" + mlObjId;
}

function addOption(){
  ++nUrls;
  var newInput = "<br><input type='text' name='email' id='url"+nUrls+"' placeholder='Escribe una URL' /> ";
  $("#urlsHolder").append(newInput);
}


/*
http://articulo.mercadolibre.com.co/MCO-426433051-call-of-duty-pack-y-mas-4-x-1-juego-digital-ps3-original-_JM#D[S:ADV,L:VIPCORE_RECOMMENDED,V:4]
http://articulo.mercadolibre.com.co/MCO-426284507-pes-16-juego-ps3-formato-digital-promocion-pro-evolution--_JM#D[S:VIP,L:SELLER_ITEMS,V:1]
*/
