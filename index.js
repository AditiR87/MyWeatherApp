let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  san_francisco: {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};
// let cityquery = prompt("Enter city name");
// cityquery = cityquery.toLowerCase();
// cityquery.trim();
// if (weather[cityquery] !== undefined) {
//   let cityTemp = weather[cityquery].temp;
//   let humidity = weather[cityquery].humidity;
//   let temperatureC = Math.round(cityTemp);

//   alert(
//     `It is currenty ${temperatureC}°C in ${cityquery} with humidity of ${humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city.
//     Try going to https://www.google.com/search?q=weather+${cityquery}`
//   );

let now = new Date();

let timings = document.querySelector(".card-text1");
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

timings.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let city = searchInput.value;
  let apiKey = "45b7085004582f496239d70da784bb1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCurrentLocationWeather(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "45b7085004582f496239d70da784bb1b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
navigator.geolocation.getCurrentPosition(searchCurrentLocationWeather);

let form = document.querySelector("#text-box");
let searchingButton = document.querySelector("#searchButton");
searchingButton.addEventListener("click", search);
form.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", searchCurrentLocationWeather);

// bonus
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 55;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 13;
}

function displayWeather(response) {
  let weatherDiv = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let windspeed = response.data.wind.speed;
  console.log(response.data);
  weatherDiv.innerHTML = `${temperature}</br> ${description}`;
  let afterclickPlaceholderText = document.querySelector("#city");
  afterclickPlaceholderText.innerHTML = `${response.data.name}`;
  let windtext = document.querySelector(".windspeed");
  let humidityvalue = document.querySelector(".humidity");
  windtext.innerHTML = windspeed;
  humidityvalue.innerHTML = humidity;
}
