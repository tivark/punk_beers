export default class ApiService {
  constructor(url) {
    this.URL = url;
    this.params = '';
  }

  setParams(page = 1, perPage = 24) {
    this.params = `?page=${page}&per_page=${perPage}`;
  }

  async get() {
    const requestUrl = this.URL + this.params;
    const response = await fetch(requestUrl);

    if (response.status === 200) {
      const data = await response.json();
      return data
    }

    throw new Error(response.status);
  }
}