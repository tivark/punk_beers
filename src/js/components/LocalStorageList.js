import { createElWithClass, setButtonEffect } from '../helpers/helpers.js';

export default class LocalStorageItems{
  constructor(parentNode){
    this.parentNode = parentNode;
    this.localStorage = window.localStorage;

    this.createHtml();
  }

  createHtml(){
    const favoriteTitle = createElWithClass('div', 'favorite-items__title');
    favoriteTitle.innerText = 'Favorites';
    this.parentNode.append(favoriteTitle);

    for(let i = 0; i < this.localStorage.length; i++){
      const id = this.localStorage.key(i);
      const name = this.localStorage.getItem(id);
      this.parentNode.append(this.createFavoriteItem(id, name));
    }

    this.clearButton = createElWithClass('div', 'favorite-items__clear-button');
    this.clearButton.innerText = 'Clear list';
    setButtonEffect(this.clearButton);

    if(this.localStorage.length === 0){
      this.toggleClearButton();
    }

    this.parentNode.append(this.clearButton);
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
    this.localStorage.clear();
    this.rerender();
  }

  toggleClearButton(){
    this.clearButton.classList.toggle('inactive');
  }
}