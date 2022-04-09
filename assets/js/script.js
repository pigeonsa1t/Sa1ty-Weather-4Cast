//console.log("hello world!");
$(document).ready(function() {

    $("#search-btn").on("click", function() {
       var search = $("#search-city").val()
       //console.log(search);
        // navigator.geolocation.getCurrentPosition((position) => {
        //     console.log(position, position.coords.longitude);
        //     // use append to get weather into box later:
        //     var card = $("<div>").addClass("card")
        //     var lat = $("<h1>").addClass("card-title").text(position.coords.latitude)
        //     var lon = $("<h1>").addClass("card-title").text(position.coords.longitude)
        //     $("#current").append(card.append(lat, lon))
            
        // });
        // drop down for state but search for city


       fetch("http://api.openweathermap.org/geo/1.0/direct?q=Savannah&limit=5&").then(function(response) {
           return response.json()
       }).then(function(data) {
           // LAT & LON WILL ONLY EXIST INSIDE OF HERE WITH
           // PULL GEOLOCATION FROM BROWSER W STATE DATA?
           console.log(data);
       } )
    });

    //.coords.latitude

});
