import RequestData from './RequestData.js';
import SelectController from './SelectController.js'

const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-clear",
  "Snow": "wi wi-dqy-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
  "Fog": "wi wi-day-fog",
  "01d": "wi wi-day-clear",
  "01n": "wi wi-night-clear",
  "02d": "wi wi-day-sunny-overcast",
  "02n": "wi wi-night-alt-partly-cloudy",
  "03d": "wi wi-day-cloudy",
  "03n": "wi wi-night-cloudy",
  "04d": "wi wi-day-sunny-overcast",
  "04n": "wi wi-night-alt-partly-cloudy",
  "09d": "wi wi-day-showers",
  "09n": "wi wi-night-alt-showers",
  "10d": "wi wi-day-rain",
  "10n": "wi wi-night-rain",
  "11d": "wi wi-day-ligthning",
  "11n": "wi wi-night-alt-lightning",
  "13d": "wi wi-day-snow",
  "13n": "wi wi-night-snow",
  "50d": "wi wi-day-haze",
  "50n": "wi wi-night-fog"
}

const requestCountrytUrl = "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json";
const selectCountry = document.querySelector('select');
const newCountries = new RequestData(requestCountrytUrl);

const requestCitytUrl = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";
const selectCity = document.getElementById('cities-select');
const newCities = new RequestData(requestCitytUrl);

function capitalize(str){
  return str[0].toUpperCase() + str.slice(1);
}
function sortJson(json)
{
  json.sort(function compare(a,b){
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
  });
}

async function main(withIP = true)
{
  let ville;
  let units;
  let meteo;
  const MY_KEY = "34751dcc6542b9445efba4a6f762beec";
  const KEY_WEATHER = "02c478b69cdc3cd2f342270f2b7c85bb";
  

  if(withIP) {
  const ip = await fetch('https://api.ipify.org?format=json')
              .then(result => result.json())
              .then(json => json.ip);

  ville = await fetch('https://api.ipstack.com/'+ip+'?access_key='+MY_KEY+'&output=json')
                .then(result => result.json())
                .then(json => console.log(json));


  if (ville === undefined) {ville = "paris";}
  units = "metric";
  } else 
  {
    ville = document.querySelector('#ville').value;
    units = document.querySelector('#units-select').value;
  }
  //recuperer l'ip
  if (units == "default") {
    meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${KEY_WEATHER}&lang=fr`)
                .then(result => result.json())
                .then(json => json);
            
  } else {
    meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${KEY_WEATHER}&lang=fr&units=${units}`)
                .then(result => result.json())
                .then(json => json);
  }  

  displayMeteo(meteo);

  
}

function getDateTime(timestamp) {
  const date = new Date(timestamp*1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}
function displayMeteo(meteo)
{
  if (meteo.cod === '404') {
    main();
  } else 
  {
    const temperature = meteo.main.temp;
    document.getElementById('temperature').innerHTML = `${Math.round(temperature)}`;

    const feelsLike = meteo.main.feels_like;
    document.getElementById('ressenti').innerHTML = `${Math.round(feelsLike)}`;

    const pressure = meteo.main.pressure;
    const humidity = meteo.main.pressure;
    const longitude = meteo.coord.lon;
    const latitude = meteo.coord.lat;
    const sunrise = meteo.sys.sunrise;
    document.getElementById('sunrise').innerHTML = getDateTime(sunrise);
    const sunset = meteo.sys.sunset;
    document.getElementById('sunset').innerHTML = getDateTime(sunset);

    const weather = meteo.weather[0];
    const weatherId = weather.id;
    const icon = "http://openweathermap.org/img/wn/" + weather.icon + ".png";
    console.log(icon);
    const description = weather.description;
    document.getElementById('conditions').innerHTML = capitalize(description);

    const wind = meteo.wind.speed;
    const cloudsPercent = meteo.clouds.all;

    console.log(meteo);
    document.querySelector('#ville').value = meteo.name;

    document.getElementById('wi-current').className = weatherIcons[weather.icon];
    document.getElementsByTagName('body')[0].className = weather.main.toLowerCase();
  }
}

const ville = document.getElementById('ville');
const newVille = document.querySelector('#cities-select');
const units = document.querySelector('#units-select');

let cities = [];


newCountries.getData()
            .then(result => 
              { 
                const selectController = new SelectController(selectCountry,result,"Name", "");
                selectController.displayOptionsListCountry();
              });
newCities.getData().then(result => {
                                      cities = result;
                                      sortJson(cities);
                                    }
                        )

selectCountry.addEventListener('change', () => {
  const countrySelected = selectCountry.options[selectCountry.selectedIndex].value;
  const selectController = new SelectController(selectCity,cities,"name", countrySelected);
  selectController.displayOptionsListCity();
                            });

newVille.addEventListener('change', (event) => 
{
  const result = document.querySelector('#ville');
  result.value = event.target.value;
  main(false)
})

units.addEventListener('change', (event) => 
{
  const modeTemp = document.querySelector('#unit');
  const modeTempRessenti = document.querySelector('#unit-ressenti');
  if (event.target.value == "imperial") 
      { 
        modeTemp.innerHTML = "F";
        modeTempRessenti.innerHTML = "F";
      }
  else if (event.target.value == "metric") 
      {
        modeTemp.innerHTML = "C";
        modeTempRessenti.innerHTML = "C";
      }
      else 
      {
        modeTemp.innerHTML = "K";
        modeTempRessenti.innerHTML = "K";
      }
  main(false)
})


main();
