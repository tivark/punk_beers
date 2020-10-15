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
}