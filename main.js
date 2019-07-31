$(document).ready(initializeApp);

function initializeApp(){
  var yelpApi = new yelp();
  var yelpDataAccess = yelpApi.getYelpData();
}
