$(document).ready(initializeApp);

function initializeApp(){
  $("button").click(getComics);
  var yelpApi = new yelp();
  var yelpDataAccess = yelpApi.getYelpData();
}
