import { createElWithClass } from '../helpers/helpers.js';
import BeerApiService from '../api/BeerApiService.js';
import ItemsBox from './ItemsBox.js';
import LocalStorageList from './LocalStorageList.js';
import TopPanel from './TopPanel.js';

export default class UserInterface {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.beerApi = new BeerApiService();
    this.localStorage = window.localStorage;
    this.currentPage = 1;
    this.createHtml();
    this.setListeners();
  }

  createHtml() {
    const mainWrapper = createElWithClass('div', 'main-content');
    const feedbackButton = createElWithClass('div', 'feedback-button');
    feedbackButton.innerText = 'Feedback';

    const listWrapper = createElWithClass('div', 'beer-list-wrapper');
    const storageWrapper = createElWithClass('div', 'favorite-items-wrapper');
    const contentBody = createElWithClass('div', 'content-body');

    contentBody.append(listWrapper, storageWrapper);

    this.beerListItems = new ItemsBox(listWrapper);
    this.storageList = new LocalStorageList(storageWrapper);
    this.topPanel = new TopPanel(mainWrapper);
    this.topPanel.setPageNum(this.currentPage);

    mainWrapper.append(contentBody);
    this.parentNode.append(mainWrapper);

    this.fulfillList();
    this.storageList.rerender();
  }

  async fulfillList() {
    try {
      const data = await this.beerApi.getData(this.currentPage);
      this.beerListItems.updateList(data).render();
      this.topPanel.toggleNextButton(data.length);
    } catch (error) {
      console.error(error.message);
    }
  }

  setListeners() {
    this.parentNode.addEventListener('click', (event) => {
      const targetClass = event.target.classList[0];

      switch (targetClass) {
        case 'abv-sort__button-asc':
          this.beerListItems.sortByAbv();
          break;
        case 'abv-sort__button-desc':
          this.beerListItems.sortByAbv('desc');
          break;
        case 'ibu-sort__button-asc':
          this.beerListItems.sortByIbu();
          break;
        case 'ibu-sort__button-desc':
          this.beerListItems.sortByIbu('desc');
          break;
        case 'beer-item__favorite-button':
          this.favoriteAction(event.target);
          break;
        case 'favorite-item__delete-button':
          this.deleteFavoriteItem(event.target);
          break;
        case 'favorite-items__clear-button':
          this.storageList.clear();
          this.resetFavorites();
          break;
        case 'pagination__prev-button':
          this.changePage(-1);
          break;
        case 'pagination__next-button':
          this.changePage(1);
          break;
      }
    })
  }

  toggleFavorite(id) {
  id in this.localStorage ?
      this.removeFromFavorite(id):
      this.addFavoriteItem(id);
  }

  addFavoriteItem(id) {
    const parentNode = Array.from(document.querySelectorAll('.beer-item'))
      .filter(item => item.dataset.id === id)[0];

    const beerName = parentNode.querySelector('.beer-item__name').innerText;
    const favButton = parentNode.querySelector('.beer-item__favorite-button');    

    favButton.innerText = 'Remove from favorite';
    favButton.classList.add('in-storage');

    this.localStorage.setItem(id, beerName);
    this.storageList.rerender();
  }

  removeFromFavorite(id) {
    this.localStorage.removeItem(id);
    this.storageList.rerender();

    const parentNode = Array.from(document.querySelectorAll('.beer-item'))
      .filter(item => item.dataset.id === id)[0];

    if (parentNode) {
      const favButton = parentNode.querySelector('.beer-item__favorite-button');

      favButton.classList.remove('in-storage');
      favButton.innerText = 'Add to favorite';
    }
  }

  favoriteAction(button) {
    const parent = button.closest('.beer-item');
    this.toggleFavorite(parent.dataset.id);
  }

  resetFavorites() {
    const favoriteButtons = Array.from(document.querySelectorAll('.beer-item__favorite-button'));
    favoriteButtons.forEach(button => {
      if (button.classList.contains('in-storage')) {
        button.classList.remove('in-storage');
        button.innerText = 'Add to favorite';
      }
    });
  }

  deleteFavoriteItem(item) {
    const id = item.closest('.favorite-item').dataset.id;
    this.toggleFavorite(id);
  }

  changePage(dir) {
    const step = dir < 0 ? -1 : 1;

    this.currentPage += step;
    this.topPanel.setPageNum(this.currentPage);

    this.fulfillList();
  }
}