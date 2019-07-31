
function flikrGallery(){
  var apiKey = "98721ce410e380c81dc67cf4214fd2a6";
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=" +
      apiKey + "&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1",
    "method": "GET",
    "headers": {}
  }

  $.ajax(settings).done(function (data) {
    console.log(data);



    $("#galleryTitle").append(data.photos.photo[0].title + " Gallery");
    $.each(data.photos.photo, function (i, gp) {

      var farmId = gp.farm;
      var serverId = gp.server;
      var id = gp.id;
      var secret = gp.secret;

      console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

      //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

      $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');

    });
  });
}
