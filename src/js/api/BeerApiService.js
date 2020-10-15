import ApiService from './ApiService.js';

export default class BeerApiService extends ApiService {
  constructor() {
    super('https://api.punkapi.com/v2/beers');
  }

  getData() {
    return this.get();
  }
}