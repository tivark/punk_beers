class BeerItem {
  constructor(beerObject) {
    this.parseData(beerObject);
  }

  parseData(beerObject) {
    this.id = beerObject.id;
  }

}