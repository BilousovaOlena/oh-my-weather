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

function showParameters(response) {
  let nameCity = document.querySelector("#city-name");
  nameCity.innerHTML = response.data.name;
  let countryName = document.querySelector("#country-name");
  countryName.innerHTML = response.data.sys.country;
  let aboutSky = document.querySelector("#sky-up");
  aboutSky.innerHTML = response.data.weather[0].description;
  let temperatureElem = document.querySelector("#temperature");
  temperatureElem.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "eaf040dff7892fc80bc32a2d99e6ebec";
let city = "Madrid";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showParameters);
