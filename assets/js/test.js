// GIFCAST APPLICATION

// variables
let weatherData = {};
let gifData = {};

// dom maniputlation variables
let cityEl = document.getElementById("city-input");
let searchEl = document.getElementById("city-button");
let tempEl = document.getElementById("temp");
let cityNameEl = document.getElementById("city-given");
let descriptionEl = document.getElementById("description");
let currentWeatherEl = document.getElementById("current-weather-box");
let weatherIconEl = document.getElementById("weather-icon");
let gifImageEl = document.getElementById("gif");
let gifImageRefEl = document.getElementById("gif-href");
let gifBoxEl = document.getElementById("giphy-box");
let historyEl = document.getElementById("history");
let historyListEl = document.getElementById("history-list");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
let deleteBtnEl = document.getElementById("clear-history");

// openweathermap api key
const WeatherAPIKey = "3a91f7f0ab2106256c3b3aafbbd9cd58";

// giphy api key
const GiphyAPIKey = "jFIH8bO506ntjvslzFtCEzBLL2oxlhhH";

// function that takes city in the input and returns the current weather
function getWeather(cityName) {
  // trying out different very cool url format
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${WeatherAPIKey}`;

  // after url is formed, fetch data
  fetch(weatherURL).then(function (response) {
    // testing output
    response.json().then(function (result) {
      // create variables to hold data
      weatherData = result;
      console.log(JSON.stringify(weatherData));
      createWeather();
      getGif();
    });
  });
}

// create elements through DOM manipulation
function createWeather() {
  // remove 'hide' class to display the elemnent
  currentWeatherEl.classList.remove("hide");

  // display city name entered
  cityNameEl.innerHTML = weatherData.name;

  // display icon for current weather
  let weatherIcon = weatherData.weather[0].icon;
  weatherIconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  weatherIconEl.setAttribute("alt", weatherData.weather[0].description);

  // fetch description
  descriptionEl.innerHTML = weatherData.weather[0].description;

  // fetch temperature
  tempEl.innerHTML = "Temperature: " + weatherData.main.temp + " 	&#8457";
}

// get desription of the weather data and put through giphy api
function getGif() {
  let weatherDescription = weatherData.weather[0].main;
  let gifURL = `https://api.giphy.com/v1/gifs/search?api_key=jFIH8bO506ntjvslzFtCEzBLL2oxlhhH&q=${weatherDescription}&limit=25&offset=0&rating=pg-13&lang=en`;

  fetch(gifURL).then(function (response) {
    // testing output
    response.json().then(function (result) {
      gifBoxEl.classList.remove("hide");
      gifData = result;
      console.log(JSON.stringify(gifData));

      // add gif to img element
      gifImageEl.setAttribute("src", gifData.data[0].embed_url);
      gifImageRefEl.setAttribute("href", gifData.data[0].url);
    });
  });
}

// search/start button
searchEl.addEventListener("click", function () {
  // variable for what city was entered
  const searchInput = cityEl.value;
  historyEl.classList.remove("hide");
  searchHistory.push(searchInput);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  getWeather(searchInput);
  renderHistory();
});

// function to clear history on button click.
deleteBtnEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  historyEl.classList.add("hide");
  renderHistory();
});

// local storage function
function renderHistory() {
  historyListEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const storedItem = document.createElement("a");
    storedItem.innerHTML =
      "<a href='#!' class='collection-item' value='" +
      searchHistory[i] +
      "'>" +
      searchHistory[i] +
      "</a>";
    storedItem.addEventListener("click", function () {
      getWeather(searchHistory[i]);
    });
    historyListEl.append(storedItem);
  }
}

// check local storage for previously searched cities
function checkHistory() {
  renderHistory();
  if (searchHistory.length > 0) {
    historyEl.classList.remove("hide");
    getWeather(searchHistory[searchHistory.length - 1]);
  }
}

// on window load run function checkHistory
window.onload = checkHistory();

// giphy reload button (time permitting)

// function to add class hide to weather and gif when clear serach history
