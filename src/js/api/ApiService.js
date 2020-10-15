export default class BeerApiService {
  constructor(url) {
    this.URL = url;
  }

  async get(parameters = '') {
    const response = await fetch(this.URL);
    if (response.status === 200) {
      const data = await response.json();
      return data
    }

    throw new Error(response.statusText);
  }
}