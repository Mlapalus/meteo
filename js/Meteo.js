import Tools from './Tools.js';
import {config} from './config.js';
import RequestData from './RequestData.js';
import SelectController from './SelectController.js';


export default class Meteo
{

  static async initCountry(selectCountry) {

  const options = await RequestData.getData(config.requestCountrytUrl)
                                  .then(result => result);
  SelectController.displayOptionsListCountry(selectCountry, options, "Name");

            }

  static async initCities(){

    let cities; 
    await RequestData.getData(config.requestCitytUrl)
                .then(result => { cities = result; 
                                  Tools.sortJson(cities)
                                });
    return cities;                      
  }


  static async run(withIP = true) {
      {
  let town;
  let units;
  let meteo;
  let ipCity;

  if(withIP) {
    ipCity = await RequestData.getData(config.requestIP);
  
    const townUrl = 'https://api.ipstack.com/'+ipCity.ip+'?access_key='+config.MY_KEY+'&output=json';
    const townFounded = await RequestData.getData(townUrl);

    if (townFounded.city === undefined) {
      town = "paris";
    } else 
    {
      town = townFounded.city
    };
    units = "metric";
  } 
  else 
  {
    town = document.querySelector('#town').value;
    console.log(town);
    units = document.querySelector('#units-select').value;
  }

  if (units == "default") {
    const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${config.KEY_WEATHER}&lang=fr`;
    meteo = await RequestData.getData(meteoUrl);           
  } 
  else {
    const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${config.KEY_WEATHER}&lang=fr&units=${units}`;
    meteo = await RequestData.getData(meteoUrl);    
  }  

  if (meteo.cod === '404') {
    this.display(config.defaultMeteo);
  } else {
    this.display(meteo);
  }
}
  }


  static display(meteo) {
    
    document.getElementById('temperature').innerHTML = `${Math.round(meteo.main.temp)}`;
    document.getElementById('fellsLike').innerHTML = `${Math.round(meteo.main.feels_like)}`;

    document.getElementById('sunrise').innerHTML = Tools.getDateTime(meteo.sys.sunrise);
    document.getElementById('sunset').innerHTML = Tools.getDateTime(meteo.sys.sunset);

    document.querySelector('#town').value = meteo.name;

    const weather = meteo.weather[0];
    
    document.getElementById('conditions').innerHTML = Tools.capitalize(weather.description);
    document.getElementById('wi-current').className = config.weatherIcons[weather.icon];
    document.getElementsByTagName('body')[0].className = weather.main.toLowerCase();
  }


  
}  