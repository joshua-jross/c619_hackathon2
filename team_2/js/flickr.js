
class FlikrPhotoSearch{
  constructor (apiKey){
    this.addClickHandlers = this.addClickHandlers.bind(this);
    this.handleClickHandlers = this.handleClickHandlers.bind(this);
    this.apiKey = apiKey;
    this.flikrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
    this.formatCallback = "format=json&nojsoncallback=1";
    this.flikrData ={};
    this.submitElementId;
    this.rangeElementId;
    this.queryElementId;
  }

  renderFlikrSearch(latitude, longitude, rangeFilter, queryFilter){
    console.log('rangeFilter :' ,rangeFilter);
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
        // console.log(farmId + ", " + serverId + ", " + id + ", " + secret + tittle);
        $("#flickr").append('<img src="https://farm' + farmId + '.staticflickr.com/'
          + serverId + '/' + id + '_' + secret + '.jpg"/>');
      });
    });
  }

  addClickHandlers(queryElementId, submitElementId){
    console.log('flikr addClickHanders')
    console.log('flikr domElement :', this.submitElementId);
    // this.rangeElementId = rangeElementId;
    this.queryElementId = queryElementId;
    this.submitElementId = submitElementId;
    $(this.submitElementId).on('click', this.handleClickHandlers);
  }

  handleClickHandlers(){
    console.log('flikr handleClickHandlers');

    var queryFilter = $(this.queryElementId).val();
    // var rangeFilter = $(this.queryElementId).val();
    console.log('queryFilter :', queryFilter);
    // console.log('rangeFilter :', rangeFilter);
    this.renderFlikrSearch(defaultLat, defaultLon, 100, queryFilter);
  }

  getFlikrData(){
    console.log('getFlikrData ', this.flikrData);
    return this.flikrData;
  }
}
