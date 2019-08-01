
$(document).ready(initializeApp);
var latitude = "33.69";
var longitude = "-117.83";
var map;

function initializeApp(){
  getSuperheroes();
  getAsteroids();

  // var yelpApi = new yelp();
  // var yelpDataAccess = yelpApi.getYelpData();

  flikrGallery();
}
