
class FlickrPhotoSearch{
  constructor (apiKey){
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.handleClickHandlers = this.handleClickHandlers.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.getPhotoLatLon = this.getPhotoLatLon.bind(this);
    // this.renderFlickrSearch = this.renderFlickrSearch.bind(this);
    this.apiKey = apiKey;
    this.flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.formatCallback = "format=json&nojsoncallback=1";
    this.flickrData =[];
    this.submitElementId;
    this.rangeElementId;
    this.queryElementId;
    this.latitude = 33.7;
    this.longitude= -117.8;
  }
  // url: `${this.flickrUrl}&api_key=${this.apiKey}&${this.formatCallback}
  //       &bbox=${latLonBox}&text=${queryFilter}`,
  renderFlickrSearch(rangeFilter, queryFilter){
    console.log('renderFlickrSearch');
    var rightLongitude = (this.longitude + rangeFilter / 30).toFixed(2)
    var rightLatitude = (this.latitude + rangeFilter / 30).toFixed(2);
    var leftLongitude = (this.longitude - rangeFilter / 30).toFixed(2);
    var leftLatitude = (this.latitude - rangeFilter / 30).toFixed(2);
    var latLonBox = `${leftLongitude},${leftLatitude},${rightLongitude},${rightLatitude}`;

    var settings = {
      async: true,
      crossDomain: true,
      url: `${this.flickrUrl}&api_key=${this.apiKey}&${this.formatCallback}`,
      method: "GET",
      headers: {},
      data: {
        bbox: latLonBox,
        text: queryFilter
      }
    }

    $.ajax(settings).done(function ( response ) {
      console.log('success');
      var photoInfo = response.photos.photo;
      console.log('photoInfo',photoInfo.length);
      for (var photoIndex = 0; photoIndex < photoInfo.length; photoIndex++){
        // $.each(response.photos.photo, function (index, photoInfo) {
        var farmId = photoInfo[photoIndex].farm;
        var serverId = photoInfo[photoIndex].server;
        var id = photoInfo[photoIndex].id;
        var secret = photoInfo[photoIndex].secret;
        $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/'
          + serverId + '/' + id + '_' + secret + '.jpg"/>');
      // })
      }
    });
  }

  getPhotoLatLon(){
    console.log('getPhotoLatLon');
  }
  addClickHandlers(queryElementId, submitElementId){
    this.queryElementId = queryElementId;
    this.submitElementId = submitElementId;
    $(this.submitElementId).on('click', this.handleClickHandlers);
  }

  handleClickHandlers(){
    var queryFilter = $(this.queryElementId).val();
    this.renderFlickrSearch(100, queryFilter);
  }

  getFlikrData(){
    return this.flickrData;
  }

  setPosition(position){
    this.latitude = position.clickLat;
    this.longitude = position.clickLon;
  }
}
