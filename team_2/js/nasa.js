
function getAsteroids(){
  console.log("getAsteroids called");

  var nasaAsteroidsObject = {
    url: "https://gateway.marvel.com:443/v1/public/comics",
    method: "get",
    dataType: "json",
    apikey: "435608fe06e27df5ce5ac15697c066a0",
    ts: "1",
    hash: "3dc9dd9717d5640740663b8cfdff952f",
    characters: "Iron Man",
    success: function(response){
      console.log("success", response);
    },
    error: function(response){
      console.log("error");
    }
  }
  $.ajax(marvelComicsObject);
}
