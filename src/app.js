function showParameters(response) {
  console.log(response.data);
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
}

let apiKey = "eaf040dff7892fc80bc32a2d99e6ebec";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showParameters);
