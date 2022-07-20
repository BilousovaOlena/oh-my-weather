function updateTime(timestamp) {
  let date = new Date(timestamp);
  let minuts = date.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayWeek = days[date.getDay()];
  return `${dayWeek} ${hours}:${minuts}`;
}
function getForecast(coordinates) {
  let apiKey = "eaf040dff7892fc80bc32a2d99e6ebec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastNow = response.data.daily;
  console.log(forecastNow);
  let forecastElement = document.querySelector("#forecast-display");
  let forecastHTML = `<div class="row">`;

  forecastNow.forEach(function (forecastDay, index) {
    if (index !== 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col weekday">
                    <div class="week-day">${formatDay(forecastDay.dt)}</div>
                    <div class="icon-forecast">
                      <img
                        src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png"
                        alt=""
                        width="40px"
                      />
                    </div>
                    <div class="temp-forecast" id="temp-forecast">
                      <span>${Math.round(
                        forecastDay.temp.max
                      )}° </span>  <span id="min-temp">   ${Math.round(
          forecastDay.temp.min
        )}°</span>
                    </div>`;
      forecastHTML = forecastHTML + `</div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function showParameters(response) {
  let nameCity = document.querySelector("#city-name");
  nameCity.innerHTML = response.data.name;
  let countryName = document.querySelector("#country-name");
  countryName.innerHTML = response.data.sys.country;
  let aboutSky = document.querySelector("#sky-up");
  aboutSky.innerHTML = response.data.weather[0].description;
  let temperatureElem = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  temperatureElem.innerHTML = Math.round(celsiusTemp);
  let humidityElem = document.querySelector("#humidity");
  humidityElem.innerHTML = response.data.main.humidity;
  let windElem = document.querySelector("#wind");
  windElem.innerHTML = Math.round(response.data.wind.speed);
  let timeElement = document.querySelector("#day-time");
  timeElement.innerHTML = updateTime(response.data.dt * 1000);
  let iconElem = document.querySelector("#icon");
  iconElem.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElem.setAttribute("alt", `response.data.weather[0].description`);
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "eaf040dff7892fc80bc32a2d99e6ebec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showParameters);
}

function searchCity(event) {
  event.preventDefault();
  let cityInputElem = document.querySelector("#search-city");
  search(cityInputElem.value);
}

function changeToFarenh(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenhLink.classList.add("active");
  let tempElem = document.querySelector("#temperature");
  let farenhTemp = (celsiusTemp * 9) / 5 + 32;
  tempElem.innerHTML = Math.round(farenhTemp);
}

function changeToCels(event) {
  event.preventDefault();
  farenhLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElem = document.querySelector("#temperature");
  tempElem.innerHTML = Math.round(celsiusTemp);
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eaf040dff7892fc80bc32a2d99e6ebec&units=metric`;
  axios.get(apiUrl).then(showParameters);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let form = document.querySelector("#all-frame");
form.addEventListener("submit", searchCity);

let farenhLink = document.querySelector("#farenh");
farenhLink.addEventListener("click", changeToFarenh);

let celsiusLink = document.querySelector("#cels");
celsiusLink.addEventListener("click", changeToCels);

let buttonCur = document.querySelector("#position-current");
buttonCur.addEventListener("click", getCurrentPosition);

let celsiusTemp = null;

search("Helsinki");
