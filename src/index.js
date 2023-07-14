function showCurrentWeather(response) {
  document.querySelector("#city-name").textContent = response.data.name;
  document.querySelector(".current-date").textContent = formatDate(new Date());
  document.querySelector(".current-degrees").textContent = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector(".weather-description").textContent =
    response.data.weather[0].description;

  document.querySelector(".precipitation").textContent =
    response.data.clouds.all + "%";
  document.querySelector(".humidity").textContent =
    response.data.main.humidity + "%";
  document.querySelector("#wind").textContent =
    response.data.wind.speed + " km/h";
}

function searchCity(city) {
  let apiKey = "874e7208f019bdf1ee693a880ec12a86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleFormSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "874e7208f019bdf1ee693a880ec12a86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}, ${hours}:${minutes}`;
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleFormSubmit);

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Johannesburg");
