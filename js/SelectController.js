export default class SelectController
{

constructor(select, options, attribut, country ){
  this.select = select;
  this.attribut = attribut;
  this.options = options;
  this.country = country;
}

createOption(value)
{
  const optionElement = document.createElement('option');
  optionElement.value = value;
  optionElement.innerHTML = value;
  return optionElement;
} 

cleanSelect(comboBox) 
{ 
  while (comboBox.options.length > 0) 
  { 
    comboBox.remove(0); 
  }

  const optionMenu = document.createElement('option');
  optionMenu.value = "";
  optionMenu.innerHTML = "---Choissez une ville---";
  optionMenu.selected = true;
  optionMenu.className = "options";
  comboBox.add(optionMenu);
}

displayOptionsListCountry()
{
  this.options.map( 
    (option) => { this.select.appendChild(this.createOption(option[this.attribut]));
                }
                )
}

displayOptionsListCity()
{
  this.cleanSelect(this.select);
  this.options.map( 
    (option) => { 
                  if(option['country'] == this.country) {
                      this.select.appendChild(this.createOption(option[this.attribut]));
                  }
                }
                )
}



} 