import BeerViewElement from './BeerViewElement.js';

export default class ItemsBox {
  constructor(parrentNode, beerList = []) {
    this.parrentNode = parrentNode;
    this.beerList = beerList;
  }

  updateList(list){
    this.beerList = list;
  }

  getHtmlElements(){
    return this.beerList.map((beerObject) => new BeerViewElement(beerObject).getElement());
  }

  renderElements(){
    this.parrentNode.innerHTML = '';
    this.parrentNode.append(...this.getHtmlElements());
  }

  rerender(){
    this.getHtmlElements();
    this.renderElements();
  }

  sortByAbv(dir = 'asc'){
    this.beerList.sort( (beerOne, beerTwo) => {
      return dir === 'asc' ? 
      beerOne.abv - beerTwo.abv:
      beerTwo.abv - beerOne.abv;
    });
  }

  sortByIbu(dir = 'asc'){
    this.beerList.sort( (beerOne, beerTwo) => {
      return dir === 'asc' ? 
      beerOne.ibu - beerTwo.ibu:
      beerTwo.ibu - beerOne.ibu;
    });
  }
}