function flikrSearch() {
  var apiKey = "98721ce410e380c81dc67cf4214fd2a6";
  var flikrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search"
  var formatCallback = "format=json&nojsoncallback=1"
  var bbox = "-117.9,33.6,-117.8,33.7"
  var rightLongitude = longitude + rangeFilter / 30;
  var rightLatitude = latitude + rangeFilter / 30;
  var leftLongitude = longitude - rangeFilter / 30;
  var leftLatitude = latitude - rangeFilter / 30;
  rightLongitude = rightLongitude.toFixed(2);
  rightLatitude = rightLatitude.toFixed(2);
  leftLongitude = leftLongitude.toFixed(2);
  leftLatitude = leftLatitude.toFixed(2);

  bbox = `${leftLongitude},${leftLatitude},${rightLatitude},${rightLatitude}`;
  console.log('bbox :', bbox);
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `${flikrUrl}&api_key=${apiKey}&${formatCallback}&bbox=${bbox}&text=${photoFilter}`,
    "method": "GET",
    "headers": {}
  }

  $.ajax(settings).done(function (data) {
    console.log(data);

    // $("#galleryTitle").append("Road Trip");
    // $("#galleryTitle").append(data.photos.photo[0].title + " SEARCH TEST");
    $.each(data.photos.photo, function (index, photoInfo) {

      var farmId = photoInfo.farm;
      var serverId = photoInfo.server;
      var id = photoInfo.id;
      var secret = photoInfo.secret;
      var tittle = photoInfo.title;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret + tittle);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

      $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/'
       + serverId + '/' + id + '_' + secret + '.jpg"/>');

    });
  });
}
