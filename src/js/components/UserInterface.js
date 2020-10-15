import { createElWithClass } from '../helpers/createElWithClass.js';
import BeerApiService from '../api/BeerApiService.js';
import ItemsBox from './ItemsBox.js';

export default class UserInterface {
  constructor(parrentNode) {
    this.parrentNode = parrentNode;
    this.beerApi = new BeerApiService();

    this.createHtml();
    this.setListeners();
  }

  createHtml() {
    const mainWrapper = createElWithClass('div', 'main-content');
    const topPanel = createElWithClass('div', 'top-panel');
    const feedbackButton = createElWithClass('div', 'feedback-button');
    feedbackButton.innerText = 'Feedback';

    this.listWrapper = createElWithClass('div', 'beer-list-wrapper');
    const buttonsWrapper = createElWithClass('span', 'sort-block');

    this.beerListItems = new ItemsBox(this.listWrapper);

    buttonsWrapper.append(this.createSortButton('abv'), this.createSortButton('ibu'));
    topPanel.append(buttonsWrapper, feedbackButton);
    mainWrapper.append(topPanel, this.listWrapper);
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

}