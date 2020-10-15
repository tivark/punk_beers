import ApiService from './ApiService.js';

export default class BeerApiService extends ApiService {
  constructor() {
    super('https://api.punkapi.com/v2/beers');
  }

  getData(page = 1, perPage = 24) {
    const params = `?page=${page}&per_page=${perPage}`;
    return this.get(params);
  }
}