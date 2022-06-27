//console.log("hello world!");
$(document).ready(function () {
  $("#search-btn").on("click", function () {
    var search = $("#search-city").val();
    console.log(search);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position, position.coords.longitude);
      // use append to get weather into box later:
      var card = $("<div>").addClass("card");
      var lat = $("<h2>").addClass("card-title").text(position.coords.latitude);
      var lon = $("<h2>")
        .addClass("card-title")
        .text(position.coords.longitude);
      $("#current").append(card.append(lat, lon));
    });
    //drop down for state but search for city
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=Savannah&limit=5&")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // LAT & LON WILL ONLY EXIST INSIDE HERE WITH
        // PULL GEOLOCATION FROM BROWSER W STATE DATA?
        console.log(data);
      });
  });

  //.coords.latitude
});

// button get-fore-btn - call API
// button search-btn - use location from browser, put into form
// add click listeners to both
// then you will get weather for current location
