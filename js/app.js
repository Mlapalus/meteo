import SelectController from './SelectController.js';
import Meteo from './Meteo.js';

const selectCountry = document.querySelector('select');
const selectCity = document.getElementById('cities-select');
const newTown = document.querySelector('#cities-select');
const units = document.querySelector('#units-select');
const town = document.querySelector('#town');


let citiesByTown;
Meteo.initCountry(selectCountry);
Meteo.initCities().then(result => citiesByTown = result);

town.addEventListener('focus', () =>
{
      town.value = "";
    });

town.addEventListener('keydown', (e) =>
            {
              if (e.keyCode === 13) {
                    e.preventDefault();
                    Meteo.run(false);
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
  Meteo.run(false)
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
  Meteo.run(false)
})



Meteo.run();
