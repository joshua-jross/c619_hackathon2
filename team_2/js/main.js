
$(document).ready(initializeApp);
var latitude = "33.69";
var longitude = "-117.83";
var map;
var photoFilter = "cats"
var rangeFilter = 50;


function initializeApp(){
  getSuperheroes();
  getAsteroids();

  var yelpApi = new yelp();
  var yelpDataAccess = yelpApi.getYelpData();
  
  addClickHandlers();

}
