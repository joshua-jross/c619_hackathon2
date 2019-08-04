
class FlickrPhotoSearch{
  constructor (apiKey){
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.handleClickHandlers = this.handleClickHandlers.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.apiKey = apiKey;
    this.flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.formatCallback = "format=json&nojsoncallback=1";
    this.flickrData ={};
    this.submitElementId;
    this.rangeElementId;
    this.queryElementId;
    this.latitude = 33.7;
    this.longitude= -117.8;
  }

  renderFlickrSearch(rangeFilter, queryFilter){
    console.log(this.latitude, this.longitude);
    var rightLongitude = (this.longitude + rangeFilter / 30).toFixed(2)
    var rightLatitude = (this.latitude + rangeFilter / 30).toFixed(2);
    var leftLongitude = (this.longitude - rangeFilter / 30).toFixed(2);
    var leftLatitude = (this.latitude - rangeFilter / 30).toFixed(2);
    var latLonBox = `${leftLongitude},${leftLatitude},${rightLongitude},${rightLatitude}`;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `${this.flickrUrl}&api_key=${this.apiKey}&${this.formatCallback}
        &bbox=${latLonBox}&text=${queryFilter}`,
      "method": "GET",
      "headers": {}
    }
    $.ajax(settings).done(function ( response ) {
      // this.flikrData  add response into object;
      $.each(response.photos.photo, function (index, photoInfo) {
        var farmId = photoInfo.farm;
        var serverId = photoInfo.server;
        var id = photoInfo.id;
        var secret = photoInfo.secret;
        var tittle = photoInfo.title;
        $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/'
          + serverId + '/' + id + '_' + secret + '.jpg"/>');
      });
    });
  }

  addClickHandlers(queryElementId, submitElementId){
    // this.rangeElementId = rangeElementId;
    this.queryElementId = queryElementId;
    this.submitElementId = submitElementId;
    $(this.submitElementId).on('click', this.handleClickHandlers);
  }

  handleClickHandlers(){
    var queryFilter = $(this.queryElementId).val();
    // var rangeFilter = $(this.queryElementId).val();
    // console.log('rangeFilter :', rangeFilter);
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
