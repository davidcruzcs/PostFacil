function call(url) {
  url = "http://articulo.mercadolibre.com.co/MCO-425960963-botas-para-hombre-en-cuero-borcegas-negro-_JM?attribute=11000-2105d8e";
  var reqURL = processURL(url);
  console.log(reqURL);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var salida = JSON.parse(xhttp.responseText);
      var newHTML = "<h1>" + salida.title + "</h1>";
      newHTML += "<span>"+ salida.currency_id + " " + salida.price + "</span><br>";
      newHTML += "<span>"+ salida.condition + "</span><br>";
      newHTML += "<span>"+ salida.permalink + "</span><br>";
      newHTML += "<span>"+ salida.thumbnail + "</span><br>";
      newHTML += "<span>"+ salida.price + "</span><br>";

      var images = salida.pictures;
      for(var i=0; i < images.length; i++){
        var image = images[i];
        var url = image.url;
        console.log("url: ", url);   //Outputs the img url
        newHTML += "<img src='"+url+"'>";
      }
      document.getElementById("demo").innerHTML = newHTML;
    }
  };
  xhttp.open("GET", reqURL, true);
  xhttp.send();
}


function processURL (url){
  console.log(url);
  var subUrl = url.split("mercadolibre.com.co/")[1].split("-");
  console.log(subUrl[0]);
  console.log(subUrl[1]);
  var resturl;
  resturl = "" +  subUrl[0] + "" + subUrl[1];
  console.log(resturl);
  return "https://api.mercadolibre.com/items/" + resturl;

}
