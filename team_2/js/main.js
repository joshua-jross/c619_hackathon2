
$(document).ready(initializeApp);
var latitude = "33.69";
var longitude = "-117.83";
// var map;
var photoFilter = "cats"
var rangeFilter = 50;

var latLonGlobal;
function initializeApp(){
  var appMap = new ApiMap(38.95, -94.63, 4,'map');
  appMap.initMap();
  appMap.addMapListener();
  latLonGlobal = appMap.getLatLonClick();



  var hero = new Superhero();
  var superheroes = hero.getSuperheroes();

  var nasa = new Nasa();
  var asteroids = nasa.getAsteroids();

  var yelpApi = new Yelp();
  var yelpDataAccess = yelpApi.getYelpData();

  // addClickHandlers();
}
