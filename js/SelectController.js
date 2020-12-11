export default class SelectController
{

static createOption(value)
{
  const optionElement = document.createElement('option');
  optionElement.value = value;
  optionElement.innerHTML = value;
  return optionElement;
} 

static cleanSelect(comboBox) 
{ 
  while (comboBox.options.length > 0) 
  { 
    comboBox.remove(0); 
  }

  const optionMenu = document.createElement('option');
  optionMenu.value = "";
  optionMenu.innerHTML = "Liste des villes disponibles";
  optionMenu.selected = true;
  optionMenu.className = "options";
  comboBox.add(optionMenu);
}

static displayOptionsListCountry(select, options, attribut)
{
  options.map( option => select.appendChild(this.createOption(option[attribut])) )                
}

static displayOptionsListCity(select, options, attribut, country)
{
  this.cleanSelect(select);
  options.map( (option) => { 
                  if(option['country'] == country) {
                      select.appendChild(this.createOption(option[attribut]));
                  }
                }
                )
}



} 