class DisplayMap {
  constructor(latCenter, lonCenter, zoom, domElementId){
    this.handleMapClick = this.handleMapClick.bind( this );
    this.addMapListener = this.addMapListener.bind(this);
    this.clickLatitude = 33.66;
    this.clickLongitude = -117.80;
    this.latCenter = latCenter;
    this.lonCenter = lonCenter;
    this.zoom = zoom;
    this.domElementId = domElementId;
    this.map = {};
    this.clickCallbackList = [];
    this.markerStorage = {
      'yelp': []
    }
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
    this.map.addListener("click", this.handleMapClick );
  }
  handleMapClick( event ){
    $('#impact')[0].play();
    this.clickLatitude = event.latLng.lat();
    this.clickLongitude = event.latLng.lng();
    console.log('click lat :', this.clickLatitude);
    console.log('clik long :', this.clickLongitude);
    var clickLatLon = {lat: this.clickLatitude, lng: this.clickLongitude}
    var impact = 'images/impact_icon2.png'
    var marker = new google.maps.Marker({
      position: clickLatLon,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: impact,
      title: 'Ground Zero'
    });
    marker.setMap(this.map);

    for( var callbackIndex = 0; callbackIndex < this.clickCallbackList.length; callbackIndex++){
      this.clickCallbackList[callbackIndex]( this.getLatLonClick() );
      console.log("clickCallbacklist", this.clickCallbackList[callbackIndex])
    }
  }
  renderMapCircle(something){
  console.log('renderMapCircle');
  }
  renderMapIcon( type, location, icon, clickCallback ){
    //var type = 'yelp'
    //var position = {lat: 37.769, lng: -122.446};
    //var icon = 'images/smurf.jpg'
    //var clickCallback = function(){}
  console.log('renderMapIcon');
    if(!this.markerStorage.hasOWnProperty(type)){
      this.markerStorage[type] = [];
    }
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: icon
    });
    this.markerStorage[type].push( marker );
    marker.setMap(this.map);
  }
removeAllMarkersByType( type ){
    for( var markerI = 0; markerI < this.markerStorage[type].length; markerI++){
      this.markerStorage[type][markerI].setMap( null );
    }
    this.markerStorage[type] = [];
  }
  getLatLonClick(){
    console.log('getLatLonClick');
    var latLon = { clickLat: this.clickLatitude, clickLon: this.clickLongitude }
    return latLon;
  }
  addClickCallback( callback ){
    this.clickCallbackList.push( callback );
  }
}
