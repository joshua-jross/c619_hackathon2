class yelp {
  constructor(){
    this.yelpAjaxConfig ={};
    // this.yelpListResults;
    this.getYelpData = this.getYelpData.bind(this);
    this.yelpSuccess = this.yelpSuccess.bind(this);
    this.yelpError = this.yelpError.bind(this);
    this.render = this.render.bind(this);
    this.body = $("body");
    this.location = "Davis";
    this.yelpName;
    this.yelpAddress;
    this.yelpRating;
    this.yelpReview;
    this.yelpPrice;
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
        'location': this.location,
        'term': "coffee"
      },
      success: this.yelpSuccess,
      error: this.yelpError
    };
    $.ajax( this.yelpAjaxConfig );
  }
  yelpSuccess(response, status){
    console.log("Success response", response);
    console.log("Success status", status);
    console.log("Diving Deeper ", response.businesses[0]);
    console.log("and deeper", response.businesses[0].name);
    this.yelpListResults = response.businesses;
    console.log(this.yelpListResults);
    this.render();
  }
  yelpError(response, status) {
    console.log("Error response", response);
    console.log("Error status", status);
  }
  render(){

    var currentResult = 0;
    var lengthOfResults = this.yelpListResults.length;
    console.log(this.yelpListResults[currentResult].image_url)
    while (currentResult < lengthOfResults){
      this.yelpName = (currentResult+1) + ". " + this.yelpListResults[currentResult].name;
      this.yelpAddress = this.yelpListResults[currentResult].location.display_address;
      if (this.yelpListResults[currentResult].rating === undefined){
        this.yelpRating = "";
      } else {
        this.yelpRating = "Rating: " + this.yelpListResults[currentResult].rating;
      }
      if (this.yelpListResults[currentResult].review_count === undefined){
        this.yelpReview = "";
      } else {
        this.yelpReview = " | " + this.yelpListResults[currentResult].review_count + " Reviews on Yelp";
      }
      if ( this.yelpListResults[currentResult].price === undefined){
        this.yelpPrice = "";
      } else {
        this.yelpPrice = " | " + this.yelpListResults[currentResult].price;
      }
      if (this.yelpListResults[currentResult].categories[0].title === undefined){
        this.yelpCategory = "";
      } else {
        this.yelpCategory = this.yelpListResults[currentResult].categories[0].title;
      }

      var resultContainer = $("<div>", {
        class: "yelpResultContainer"
      });
      var resultName = $("<div>", {
        class: "yelpName",
        text: this.yelpName
      });
      var resultAddress = $("<div>", {
        class: "yelpAddress",
        text: this.yelpAddress
      });
      var resultRatingReviewPrice = $("<div>", {
        class: "yelpRatingReviewPrice",
        text: this.yelpRating + " " + this.yelpReview + " " +  this.yelpPrice
      });
      var resultCategory = $("<div>", {
        class: "yelpCategory",
        text: this.yelpCategory = this.yelpCategory
      });
      var resultPhotoDiv = $("<div>", {
        class: "yelpContainer",
      });
      var resultPhoto = $("<img>", {
        class: "yelpPhoto"
      });
      resultPhoto.attr("src", this.yelpListResults[currentResult].image_url)
      resultPhotoDiv.append(resultPhoto);
      resultContainer.append(resultPhotoDiv, resultName, resultAddress, resultRatingReviewPrice, resultCategory);
      this.body.append(resultContainer);
      currentResult++;
    }
  }
}
