
function getAsteroids(){
  console.log("getAsteroids called");

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() -1);
  var yesterdayDate = yesterday.getDate();
  var yesterdayMonth = yesterday.getMonth() + 1;
  var yesterdayYear = yesterday.getFullYear();
  if(yesterdayDate < 10){
    yesterdayDate = "0" + yesterdayDate;
  }
  if(yesterdayMonth < 10){
    yesterdayMonth = "0" + yesterdayMonth;
  }
  yesterday = [yesterdayYear, yesterdayMonth, yesterdayDate].join('-');
  console.log(yesterday);

  // var sevenDaysAgo = new Date();
  // sevenDaysAgo.setDate(sevenDaysAgo.getDate() -7);
  // var sevenDaysAgoDate = sevenDaysAgo.getDate();
  // var sevenDaysAgoMonth = sevenDaysAgo.getMonth() + 1;
  // var sevenDaysAgoYear = sevenDaysAgo.getFullYear();
  // if(sevenDaysAgoDate < 10){
  //   sevenDaysAgoDate = "0" + sevenDaysAgoDate;
  // }
  // if(sevenDaysAgoMonth < 10){
  //   sevenDaysAgoMonth = "0" + sevenDaysAgoMonth;
  // }
  // sevenDaysAgo = [sevenDaysAgoYear, sevenDaysAgoMonth, sevenDaysAgoDate].join('-');
  // console.log(sevenDaysAgo);

  var nasaAsteroidsObject = {
    url: "https://api.nasa.gov/neo/rest/v1/feed",
    method: "get",
    dataType: "json",
    data: {
      api_key: "jHkKcbwwbWci3IntdOPehBbtfG91DJ6KxgSvqKDo",
      start_date: yesterday,
      // end_date: yesterday,
    },
    success: function(response){
      console.log("success", response);

      // var asteroidCountStart = response.near_earth_objects[sevenDaysAgo].length;
      // console.log(asteroidCountStart);

      var asteroidCount = response.near_earth_objects[yesterday].length;
      console.log(asteroidCount);

      var asteroidArray = response.near_earth_objects[yesterday];
      console.log(asteroidArray);

      var asteroidName;
      var asteroidSize;
      var asteroidNameArray = [];
      var asteroidSizeArray = [];
      for(var asteroidIndex = 0; asteroidIndex < asteroidArray.length; asteroidIndex++){
        asteroidName = response.near_earth_objects[yesterday][asteroidIndex].name;
        asteroidNameArray.push(asteroidName);

        asteroidSize = response.near_earth_objects[yesterday][asteroidIndex].estimated_diameter.feet.estimated_diameter_max;
        asteroidSizeArray.push(asteroidSize);
      }
      console.log(asteroidNameArray);
      console.log(asteroidSizeArray);

      var nameDiv = $("<div>");
      nameDiv.text(asteroidNameArray);
      $(".asteroidContainer").append(nameDiv);

      var sizeDiv = $("<div>");
      sizeDiv.text(asteroidSizeArray);
      $(".asteroidContainer").append(sizeDiv);
    },
    error: function(response){
      console.log("error");
    }
  }
  $.ajax(nasaAsteroidsObject);
}
