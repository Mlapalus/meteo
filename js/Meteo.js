import Tools from './Tools.js';
import RequestData from './RequestData.js';
import SelectController from './SelectController.js';


export default class Meteo
{
  constructor(config) {
    this.config = config;
  }

  async initCountry(selectCountry) {

  const options = await RequestData.getData(this.config.requestCountrytUrl)
                                  .then(result => result);
  SelectController.displayOptionsListCountry(selectCountry, options, "Name");

            }

  async initCities(){

    let cities; 
    await RequestData.getData(this.config.requestCitytUrl)
                .then(result => { cities = result; 
                                  Tools.sortJson(cities)
                                });
    return cities;                      
  }


  async run(withIP = true) {
      {
  let town;
  let units;
  let meteo;
  let ipCity;

  if(withIP) {
    ipCity = await RequestData.getData(this.config.requestIP);
  
    const townUrl = 'https://api.ipstack.com/'+ipCity.ip+'?access_key='+this.config.MY_KEY+'&output=json';
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
    units = document.querySelector('#units-select').value;
  }

  if (units == "default") {
    const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${this.config.KEY_WEATHER}&lang=fr`;
    meteo = await RequestData.getData(meteoUrl);           
  } 
  else {
    const meteoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${this.config.KEY_WEATHER}&lang=fr&units=${units}`;
    meteo = await RequestData.getData(meteoUrl);    
  }  

  if (meteo.cod === '404') {
    this.display(this.config.defaultMeteo);
  } else {
    this.display(meteo);
  }
}
  }


  display(meteo) {
    
    document.getElementById('temperature').innerHTML = `${Math.round(meteo.main.temp)}`;
    document.getElementById('fellsLike').innerHTML = `${Math.round(meteo.main.feels_like)}`;

    document.getElementById('sunrise').innerHTML = Tools.getDateTime(meteo.sys.sunrise);
    document.getElementById('sunset').innerHTML = Tools.getDateTime(meteo.sys.sunset);

    document.querySelector('#town').value = meteo.name;

    const weather = meteo.weather[0];
    
    document.getElementById('conditions').innerHTML = Tools.capitalize(weather.description);
    document.getElementById('wi-current').className = this.config.weatherIcons[weather.icon];
    document.getElementsByTagName('body')[0].className = weather.main.toLowerCase();
  }


  
}  