$(document).ready(initializeApp);
var defaultLat = 33.69;
var defaultLon = -117.83;
var latitude = defaultLat;
var longitude = defaultLon;
var defaultPhoto = "cats"
var defaultRange = 50;
var appMap = null;
var flikrPhotoSearch = null;


function initializeApp(){
  appMap = new DisplayMap(38.95, -94.63, 4, 'map');
  appMap.initMap();
  appMap.addMapListener();

  var flikrApiKey = "98721ce410e380c81dc67cf4214fd2a6";
  flikrPhotoSearch = new FlikrPhotoSearch(flikrApiKey);
  flikrPhotoSearch.addClickHandlers('#photoFilter','#submitPhotoFilter');

  var hero = new Superhero();
  var superheroes = hero.getSuperheroes();
  // appMap.addClickCallback( superheroes.updateSuperhero )

  var nasa = new Nasa();
  var asteroids = nasa.getAsteroids();
  // appMapp.addClickCallback( asteroids.handleImpact );

  var yelpApi = new Yelp();
  var yelpDataAccess = yelpApi.getYelpData();
  // appMap.addClickCallback( yelpApi.getRestaurantsForLocation );

  // addClickHandlers();
}
