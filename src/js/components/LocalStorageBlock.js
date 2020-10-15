import {createElWithClass} from '../helpers/createElWithClass.js';

export default class LocalStorageItems{
  constructor(parentNode){
    this.parentNode = parentNode;
    this.localStorage = window.localStorage;

    this.createHtml();
  }

  createHtml(){
    for(let i = 0; i < this.localStorage.length; i++){
      const id = this.localStorage.key(i);
      const name = this.localStorage.getItem(i);
      this.parentNode.append(this.createFavoriteItem(id, name));
    }
  }

  createFavoriteItem(id, name){
    const favoriteItem = createElWithClass('div', 'favorite-item');
    const itemName = createElWithClass('div', 'favorite-item__name');
    const itemDeleteButton = createElWithClass('div', 'favorite-item__delete-button');
    
    itemName.innerText = name;

    favoriteItem.dataset.id = id;
    favoriteItem.append(itemName, itemDeleteButton);

    return favoriteItem;
  }

  rerender(){
    this.parentNode.innerHTML = '';
    this.createHtml();
  }

  clear(){
    this.parentNode.innerHTML = '';
  }

}