import { createElWithClass } from '../helpers/createElWithClass.js';
import BeerApiService from '../api/BeerApiService.js';
import ItemsBox from './ItemsBox.js';

export default class UserInterface {
  constructor(parrentNode) {
    this.parrentNode = parrentNode;
    this.beerApi = new BeerApiService();
    this.localStorage = window.localStorage;

    this.createHtml();
    this.setListeners();
  }

  createHtml() {
    const mainWrapper = createElWithClass('div', 'main-content');
    const topPanel = createElWithClass('div', 'top-panel');
    const feedbackButton = createElWithClass('div', 'feedback-button');
    feedbackButton.innerText = 'Feedback';
    const buttonsWrapper = createElWithClass('span', 'sort-block');

    const listWrapper = createElWithClass('div', 'beer-list-wrapper');
    const storageWrapper = createElWithClass('div', 'favorite-items-wrapper');
    const contentBody = createElWithClass('div', 'content-body');

    contentBody.append(listWrapper, storageWrapper);

    this.beerListItems = new ItemsBox(listWrapper);

    buttonsWrapper.append(this.createSortButton('abv'), this.createSortButton('ibu'));
    topPanel.append(buttonsWrapper, feedbackButton);
    mainWrapper.append(topPanel, contentBody);
    this.parrentNode.append(mainWrapper);

    this.fulfillList();
  }

  createSortButton(type) {
    const sortWrapper = createElWithClass('div', `${type}-sort-wrapper`);
    const sortText = createElWithClass('span', `${type}-sort__text`);
    sortText.innerText = `Sort by ${type}`;

    const sortButtonsWrapper = createElWithClass('span', 'sort-buttons-wrapper')
    const sortButtonAsc = createElWithClass('span', `${type}-sort__button-asc`);
    const sortButtonDesc = createElWithClass('span', `${type}-sort__button-desc`);

    sortButtonsWrapper.append(sortButtonAsc, sortButtonDesc);
    sortWrapper.append(sortText, sortButtonsWrapper);

    return sortWrapper;
  }

  async fulfillList() {
    const data = await this.beerApi.getData();
    this.beerListItems.updateList(data).rerender();
  }

  setListeners() {
    this.parrentNode.addEventListener('click', (event) => {
      const targetClass = event.target.classList[0];

      switch (targetClass) {
        case 'abv-sort__button-asc':
          this.sortBeerListAbvAsc();
          break;
        case 'abv-sort__button-desc':
          this.sortBeerListAbvDesc();
          break;
        case 'ibu-sort__button-asc':
          this.sortBeerListIbuAsc();
          break;
        case 'ibu-sort__button-desc':
          this.sortBeerListIbuDesc();
          break;
        case 'beer-item__favorite-button':
          this.favoriteAction(event.target);
          break;
      }
    })
  }

  sortBeerListAbvAsc() {
    this.beerListItems.sortByAbv().rerender();
  }

  sortBeerListAbvDesc() {
    this.beerListItems.sortByAbv('desc').rerender();
  }

  sortBeerListIbuAsc() {
    this.beerListItems.sortByIbu().rerender();
  }

  sortBeerListIbuDesc() {
    this.beerListItems.sortByIbu('desc').rerender();
  }

  toggleFavorite(id) {
    const parrentNode = Array.from(document.querySelectorAll('.beer-item')).filter(item => item.dataset.id === id)[0];
    const beerName = parrentNode.querySelector('.beer-item__name').innerText;
    const favButton = parrentNode.querySelector('.beer-item__favorite-button');

    if (this.localStorage[id]) {
      this.localStorage.removeItem(id);
      favButton.classList.remove('in-storage');
      favButton.innerText = 'Add to favorite';
    } else {
      this.localStorage.setItem(id, beerName);
      favButton.innerText = 'Remove from favorite';
      favButton.classList.add('in-storage');
    }
  }

  favoriteAction(button){
    const parrentNode = button.closest('.beer-item');
    this.toggleFavorite(parrentNode.dataset.id);
  }
}