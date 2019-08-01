
var randomNum = Math.floor((Math.random() * 731) + 1);

function getSuperheroes(){
  console.log("getSuperheroes called");

  var superheroesObject = {
    url: "superheroapi.php",
    method: "get",
    dataType: "json",
    data: {
      apikey: "10217629195674986",
      id: randomNum
    },
    success: function(response){
      console.log("success", response);

      var superheroImage = response.image.url;
      var image = $("<img>");
      image.attr("src", superheroImage);

      var imageDiv = $("<div>");
      imageDiv.append(image);

      var superheroName = response.name;
      var nameDiv = $("<div>");
      nameDiv.text(superheroName);

      var superheroBase = response.work.base;
      var baseDiv = $("<div>");
      baseDiv.text(superheroBase);

      $(".superheroContainer").append(imageDiv, nameDiv, baseDiv);
    },
    error: function(response){
      console.log("error");
    }
  }
  $.ajax(superheroesObject);
}
