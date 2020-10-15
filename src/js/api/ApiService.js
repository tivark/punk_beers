export default class BeerApiService {
  constructor(url) {
    this.URL = url;
  }

  async get(params = '') {
    const requestUrl = this.URL + params;
    const response = await fetch(requestUrl);
    if (response.status === 200) {
      const data = await response.json();
      return data
    }

    throw new Error(response.statusText);
  }
}