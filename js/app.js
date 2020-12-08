import RequestData from './RequestData.js';
import SelectController from './SelectController.js'

const weatherIcons = {
  "Rain": "wi wi-day-rain",
  "Clouds": "wi wi-day-cloudy",
  "Clear": "wi wi-day-clear",
  "Snow": "wi wi-dqy-snow",
  "mist": "wi wi-day-fog",
  "Drizzle": "wi wi-day-sleet",
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
  const MY_KEY = "34751dcc6542b9445efba4a6f762beec";
  const KEY_WEATHER = "02c478b69cdc3cd2f342270f2b7c85bb";
  

  if(withIP) {
  const ip = await fetch('https://api.ipify.org?format=json')
              .then(result => result.json())
              .then(json => json.ip);

  ville = await fetch('https://api.ipstack.com/'+ip+'?access_key='+MY_KEY+'&output=json')
                .then(result => result.json())
                .then(json => json.city);
  } else 
  {
    ville = document.querySelector('#ville').value;
  }
  //recuperer l'ip

  const meteo = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${KEY_WEATHER}&lang=fr&units=metric`)
                .then(result => result.json())
                .then(json => json);
            

  displayMeteo(meteo);

  
}
function displayMeteo(meteo)
{
  if (meteo.cod === '404') {
    main();
  } else 
  {
    document.querySelector('#ville').value = meteo.name;
    document.getElementById('temperature').innerHTML = Math.round(meteo.main.temp);
    const weather = meteo.weather[0];
    document.getElementsByTagName('i')[0].className = weatherIcons[weather.main];
    document.getElementById('conditions').innerHTML = capitalize(weather.description);
    document.getElementsByTagName('body')[0].className = weather.main.toLowerCase();
  }
}

const ville = document.getElementById('ville');
const newVille = document.querySelector('#cities-select');


newCountries.getData()
            .then(result => 
              { 
                const selectController = new SelectController(selectCountry,result,"Name", "");
                selectController.displayOptionsListCountry();
              });


selectCountry.addEventListener('change', () => {
  const countrySelected = selectCountry.options[selectCountry.selectedIndex].value;
  newCities.getData().then(result => 
                            {
                              sortJson(result);
                              const selectController = new SelectController(selectCity,result,"name", countrySelected);
                              selectController.displayOptionsListCity();
                            });
});

newVille.addEventListener('change', (event) => 
{
  const result = document.querySelector('#ville');
  result.value = event.target.value;
  main(false)
})

main();
