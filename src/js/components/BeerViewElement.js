import {createElWithClass} from '../helpers/createElWithClass.js';

export default class BeerViewElement{
  constructor(beerObject){
    this.beerObject = beerObject;
    this.createHTML();
    this.setListener();
  }

  createHTML(){
    this.itemWrapper = createElWithClass('div', 'beer-item');
    this.itemWrapper.dataset.id = this.beerObject.id;

    const itemImage = createElWithClass('img','beer-item__image');
    itemImage.setAttribute('src', this.beerObject['image_url']);

    const itemName = createElWithClass('div', 'beer-item__name');
    itemName.innerText = this.beerObject.name;

    const itemContributor = createElWithClass('div', 'beer-item__contributor');
    itemContributor.innerText = this.beerObject['contributed_by'];
    
    this.itemWrapper.append(itemImage, itemName, itemContributor);
  }

  getElement(){
    return this.itemWrapper;
  }

  setListener(){
    this.itemWrapper.addEventListener('click', (event)=>{
      console.log(event.target);
    });
  }
}