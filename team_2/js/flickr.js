
class FlikrPhotoSearch{
  constructor (apiKey){
    this.apiKey = apiKey;
    this.flikrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.formatCallback = "format=json&nojsoncallback=1";
    this.flikrData ={};
  }

  requestApiData(latitude, longitude, rangeFilter, photoFilter){
    if (latitude < 0){
      rangFilter *= -1;
    }
    var rightLongitude = (longitude + rangeFilter / 30).toFixed(2)
    var rightLatitude = (latitude + rangeFilter / 30).toFixed(2);
    var leftLongitude = (longitude - rangeFilter / 30).toFixed(2);
    var leftLatitude = (latitude - rangeFilter / 30).toFixed(2);
    var latLonBox = `${leftLongitude},${leftLatitude},${rightLatitude},${rightLatitude}`;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `${this.flikrUrl}&api_key=${this.apiKey}&${this.formatCallback}
        &bbox=${latLonBox}&text=${photoFilter}`,
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function ( response ) {
      this.flikrData = response;
      console.log('this flikrData :', this.flikrData);
      $.each(response.photos.photo, function (index, photoInfo) {
        var farmId = photoInfo.farm;
        var serverId = photoInfo.server;
        var id = photoInfo.id;
        var secret = photoInfo.secret;
        var tittle = photoInfo.title;

        // console.log(farmId + ", " + serverId + ", " + id + ", " + secret + tittle);

        //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

        $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/'
          + serverId + '/' + id + '_' + secret + '.jpg"/>');
        // $("#galleryTitle").append("Road Trip");
        // $("#galleryTitle").append(data.photos.photo[0].title + " SEARCH TEST");
      });
    });
  }
}
