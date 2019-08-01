
$(document).ready(initializeApp);
var latitude = "33.69";
var longitude = "-117.83";
var map;
var photoFilter = "cats"
var rangeFilter = 50;


function initializeApp(){
  var hero = new Superhero();
  var superheroes = hero.getSuperheroes();

  var nasa = new Nasa();
  var asteroids = nasa.getAsteroids();

  var yelpApi = new Yelp();
  var yelpDataAccess = yelpApi.getYelpData();

  addClickHandlers();
}
