function call() {
  var url = document.getElementById("email").value;
  var reqURL = processURL(url);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var salida = JSON.parse(xhttp.responseText);
      var newHTML = "<center><h1>" + salida.title + "</h1><center>";
      newHTML += "<span>precio: "+ salida.currency_id + " " + salida.price + "</span><br>";
      var est = salida.condition == "new" ? "nuevo" : "usado";
      newHTML += "<span>estado: "+ est + "</span><br>";
      newHTML += "<span><a href='"+salida.permalink+"'> link mercadolibre </a></span><br>";
      newHTML += "<img src='"+salida.thumbnail+"'><br>";

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
  var subUrl = url.split("mercadolibre.com.co/")[1].split("-");
  var resturl;
  resturl = "" +  subUrl[0] + "" + subUrl[1];
  return "https://api.mercadolibre.com/items/" + resturl;

}
