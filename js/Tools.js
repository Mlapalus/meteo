export default class Tools
{
  static capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
  }

  static sortJson(json){
    json.sort(function compare(a,b){
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
    });
  }


  static getDateTime(timestamp) {
          const date = new Date(timestamp*1000);
          const hours = date.getHours();
          const minutes = "0" + date.getMinutes();
  
          return hours + ":" + minutes.substr(-2);
}

}