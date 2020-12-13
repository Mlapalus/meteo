import SelectController from './SelectController.js';
import Meteo from './Meteo.js';
import Config from './Config.js';

const selectCountry = document.querySelector('select');
const selectCity = document.getElementById('cities-select');
const newTown = document.querySelector('#cities-select');
const units = document.querySelector('#units-select');
const town = document.querySelector('#town');


let citiesByTown;
const meteo = new Meteo(new Config());

meteo.initCountry(selectCountry);
meteo.initCities().then(result => citiesByTown = result);

town.addEventListener('focus', () =>
{
      town.value = "";
    });

town.addEventListener('keydown', (e) =>
            {
              if (e.keyCode === 13) {
                    e.preventDefault();
                    meteo.run(false);
              }
            });

selectCountry.addEventListener('change', () => {
  const countrySelected = selectCountry.options[selectCountry.selectedIndex].value;
  SelectController.displayOptionsListCity(selectCity, citiesByTown, "name", countrySelected);
                            });

newTown.addEventListener('change', (event) => 
{
  const result = document.querySelector('#town');
  result.value = event.target.value;
  meteo.run(false)
})

units.addEventListener('change', (event) => 
{
  const modeTemp = document.querySelector('#unit');
  const modeTempFeelsLike = document.querySelector('#unit-fellsLike');
  if (event.target.value == "imperial") 
      { 
        modeTemp.innerHTML = "F";
        modeTempFeelsLike.innerHTML = "F";
      }
  else if (event.target.value == "metric") 
      {
        modeTemp.innerHTML = "C";
        modeTempFeelsLike.innerHTML = "C";
      }
      else 
      {
        modeTemp.innerHTML = "K";
        modeTempFeelsLike.innerHTML = "K";
      }
  meteo.run(false)
})



meteo.run();
