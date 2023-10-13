const btnBuscar = document.getElementById("btnBuscar");
const searchCity = document.getElementById("searchCity");

searchCity.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const city_name_search = searchCity.value.toLowerCase();
    apiCall(city_name_search);
  }
});

if (btnBuscar) {
  btnBuscar.addEventListener("click", function () {
    const city_name_search = searchCity.value.toLowerCase();
    console.log(searchCity);
    apiCall(city_name_search);
  });
}
async function apiCall(city) {
  const apiKey = "c8e5c300a8d64302bf30d65d3c978a7a";
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      mostarStats(result);
    })
    .catch((e) => {});
}

function mostarStats(citySearch) {
  const citynameContainer = document.querySelector(".cityname");
  const firstTitle = document.querySelector(".firstTitle");
  const humidityContainer = document.querySelector(".humidity");
  const windContainer = document.querySelector(".wind");
  const containerIMG = document.querySelector(".buscarCiudad");

  const temp = citySearch.data[0].app_temp;
  const cityName = citySearch.data[0].city_name;
  const codeCountry = citySearch.data[0].country_code;
  const windVel = citySearch.data[0].wind_spd;
  const humidity = citySearch.data[0].rh;
  const code = citySearch.data[0].weather.code;

  if (code === 800) {
    containerIMG.src = "sources/icons/clear.png";
  } else if (code >= 800 && code <= 804) {
    containerIMG.src = "sources/icons/cloud.png";
  } else if (code >= 200 && code <= 233) {
    containerIMG.src = "sources/icons/snow.png";
  } else if (code >= 700 && code <= 751) {
    containerIMG.src = "sources/icons/mist.png";
  } else if (code >= 300 && code <= 623) {
    containerIMG.src = "sources/icons/rain.png";
  }

  //containerIMG.innerHTML = `<img src="${icon}">`
  firstTitle.innerHTML = `<i class="fa-solid fa-temperature-low"></i><p>Temperatura: ${temp}°C</p>`;
  citynameContainer.innerHTML = `<i class="fa-solid fa-location-dot"></i><p>${cityName} - ${codeCountry}</p>`;
  humidityContainer.innerHTML = `<i class="fa-solid fa-water"></i><span class="humidityTEXT">Humedad: <br>${humidity}%</span>`;
  windContainer.innerHTML = `<i class="fa-solid fa-wind"></i><span class="windTEXT">Viento a: <br>${windVel}Km/h</span>`;

  console.log(citySearch.data[0]);
}
//mostarStats();
//20 INTENTOS
