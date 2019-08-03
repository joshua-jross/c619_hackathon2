class ApiMap {
  constructor(latCenter, lonCenter, zoom, domElementId){
    this.clickLatitude = 33.66;
    this.clickLongitude = -117.80;
    this.latCenter = latCenter;
    this.lonCenter = lonCenter;
    this.zoom = zoom;
    this.domElementId = domElementId;
    this.map = {};
    this.addMapListener = this.addMapListener.bind(this);
  }

initMap(){
  console.log('initMap');
  console.log('domElementId :', this.domElementId);
  this.map = new google.maps.Map(document.getElementById(this.domElementId), {
    center: { lat: this.latCenter, lng: this.lonCenter },
    zoom: this.zoom
  });
  console.log('map object :', this.map)
}

addMapListener(){
  console.log('addMapListener');
  this.map.addListener("click", function (event) {
    console.log('event ', event);
    this.clickLatitude = event.latLng.lat();
    this.clickLongitude = event.latLng.lng();
    console.log('click lat :', this.clickLatitude);
    console.log('clik long :', this.clickLongitude);
    latitude = this.clickLatitude;
    longitude = this.clickLongitude;
  });
}
renderMapCircle(something){
console.log('renderMapCircle');
}
renderMapIcon(something){
console.log('renderMapIcon');
}
getLatLonClick(){
  console.log('getLatLonClick');
  var latLon = { clickLat: this.clickLatitude, clickLon: this.clickLongitude }
  return latLon;
}
}
