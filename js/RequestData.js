
export default class RequestData {

  constructor(url) {
    this.url = url;
  }

  async getData() {
    return await fetch(this.url).then(response => response.json())
    }
}
