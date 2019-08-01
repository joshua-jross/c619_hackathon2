
class yelp {
  constructor(){
    this.yelpAjaxConfig ={};
    this.getYelpData = this.getYelpData.bind(this);
    this.yelpSuccess = this.yelpSuccess.bind(this);
    this.yelpError = this.yelpError.bind(this);
    // this.render = this.render.bind(this);
  }
  getYelpData(){
    this.yelpAjaxConfig = {
      dataType: "json",
      url: "yelp.php",
      method: 'get',
      headers: {
        "Authorization": "Bearer K86dXVGhsx9t-SEYXVTpp6lJr2CBl3aLKBcXnOMdf8tUp0mBe9rzWbSu-5LGORVbqnNCWrAMngd0-VvR7IugL9R-fwgPeEFOhDeFo_APDkIhIlTICac9Omtp_gNBXXYx"
      },
      data: {
        'location': 'irvine'
      },
      success: this.yelpSuccess,
      error: this.yelpError
    };
    $.ajax( this.yelpAjaxConfig );
  }
  yelpSuccess(response, status){
    console.log("Success response", response);
    console.log("Success status", status);
    // console.log("Diving Deeper ", response.businesses[0]);
  }
  yelpError(response, status) {
    console.log("Error response", response);
    console.log("Error status", status);
  }
  // render(){
  //   var
  // }
}
