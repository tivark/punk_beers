import { createElWithClass } from '../helpers/createElWithClass.js';

export default class BeerViewElement {
  constructor(beerObject) {
    this.beerObject = beerObject;
    this.createHTML();
  }

  createHTML() {
    this.itemWrapper = createElWithClass('div', 'beer-item');
    this.itemWrapper.dataset.id = this.beerObject.id;

    const itemImageWrapper = createElWithClass('div', 'berr-item__image-wrapper');

    const itemImage = createElWithClass('img', 'beer-item__image');
    itemImage.setAttribute('src', this.beerObject['image_url']);

    const itemName = createElWithClass('div', 'beer-item__name');
    itemName.innerText = this.beerObject.name;

    const itemContributor = createElWithClass('div', 'beer-item__contributor');
    itemContributor.innerText = this.beerObject['contributed_by'];

    const itemAbv = createElWithClass('div', 'beer-item__abv');
    
    const abvTitle = createElWithClass('span', 'beer-item__abv-title');
    abvTitle.innerText = 'Alcohol';

    const abvValue = createElWithClass('span', 'beer-item__abv-value');
    abvValue.innerText = `${this.beerObject.abv}%`;

    const itemIbu = createElWithClass('div', 'beer-item__ibu');
    
    const ibuTitle = createElWithClass('span', 'beer-item__ibu-title');
    ibuTitle.innerText = 'IBU';

    const ibuValue = createElWithClass('span', 'beer-item__ibu-value');
    ibuValue.innerText = this.beerObject.ibu;
    
    const descLabel = createElWithClass('span', 'beer-item__description-label');
    descLabel.innerText = 'Description:';

    const itemDesc = createElWithClass('div', 'beer-item__description');
    itemDesc.innerText = this.beerObject.description;

    const favoriteButton = createElWithClass('div', 'beer-item__favorite-button');
    favoriteButton.innerText = 'Add to favorite';

    itemImageWrapper.append(itemImage);
    itemAbv.append(abvTitle, abvValue);
    itemIbu.append(ibuTitle, ibuValue);
    this.itemWrapper.append(
      itemImageWrapper, 
      itemName, 
      itemContributor, 
      itemAbv, 
      itemIbu,
      descLabel, 
      itemDesc,
      favoriteButton
    );
  }

  getElement() {
    return this.itemWrapper;
  }
}