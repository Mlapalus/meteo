export default class Config 
{
  constructor() {
    this.weatherIcons = {
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
                  };
  
  this.requestCountrytUrl = "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json";
  
  this.requestCitytUrl =  "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

  this.requestIP =  "https://api.ipify.org?format=json";
  
  this.MY_KEY = "34751dcc6542b9445efba4a6f762beec";
  
  this.KEY_WEATHER = "02c478b69cdc3cd2f342270f2b7c85bb";

  this.defaultMeteo = {
                  main: {
                          temp: 0,
                          feels_like: 0,
                  },
                  sys: {
                          sunrise: 0,
                          sunset: 0,
                  },
                  name: "Mauvais nom de ville",
                  weather: [
                    {
                      description: "Be Cool",
                      icon: '50d',
                      main: "Clear"
                    }
                  ]
  }



  }
  
}