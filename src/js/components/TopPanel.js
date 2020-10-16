import { createElWithClass, setButtonEffect } from '../helpers/helpers.js';

export default class TopPanel {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.createHtml();
  }

  createHtml() {
    const mainWrapper = createElWithClass('div', 'top-panel');
    const feedbackBox = createElWithClass('div', 'top-panel__feedback-box');
    const feedbackButton = createElWithClass('div', 'feedback-button');
    feedbackButton.innerText = 'Feedback';
    setButtonEffect(feedbackButton);

    const buttonsWrapper = createElWithClass('span', 'sort-block');
    const controlBox = createElWithClass('div', 'top-panel__control-box');

    buttonsWrapper.append(this.createSortButton('abv'), this.createSortButton('ibu'));
    controlBox.append(buttonsWrapper, this.createPagination());
    feedbackBox.append(feedbackButton);

    mainWrapper.append(controlBox, feedbackBox);
    this.parentNode.append(mainWrapper);
  }


  createSortButton(type) {
    const sortWrapper = createElWithClass('div', `${type}-sort-wrapper`);
    const sortText = createElWithClass('span', `${type}-sort__text`);
    sortText.innerText = `Sort by ${type}`;

    const sortButtonsWrapper = createElWithClass('span', 'sort-buttons-wrapper')
    const sortButtonAsc = createElWithClass('button', `${type}-sort__button-asc`);
    const sortButtonDesc = createElWithClass('button', `${type}-sort__button-desc`);

    setButtonEffect(sortButtonAsc);
    setButtonEffect(sortButtonDesc);

    sortButtonsWrapper.append(sortButtonAsc, sortButtonDesc);
    sortWrapper.append(sortText, sortButtonsWrapper);

    return sortWrapper;
  }

  createPagination() {
    const paginationWrapper = createElWithClass('div', 'pagination-wrapper');
    const prevButtonWrapper = createElWithClass('div', 'prev-button-wrapper');
    this.prevButton = createElWithClass('button', 'pagination__prev-button');
    this.prevButton.innerText = 'Previous Page';

    this.pageIndicator = createElWithClass('div', 'pagination__page-indicator');

    const nextButtonWrapper = createElWithClass('div', 'next-button-wrapper');
    this.nextButton = createElWithClass('button', 'pagination__next-button');
    this.nextButton.innerText = 'Next Page';

    setButtonEffect(this.prevButton);
    setButtonEffect(this.nextButton);

    prevButtonWrapper.append(this.prevButton);
    nextButtonWrapper.append(this.nextButton);

    paginationWrapper.append(prevButtonWrapper, this.pageIndicator, nextButtonWrapper);

    return paginationWrapper;
  }

  setPageNum(pageNum) {
    this.pageIndicator.innerText = pageNum;
    this.togglePrevButton(pageNum);
  }

  toggleNextButton(elNums) {
    elNums != 24 ?
      this.nextButton.classList.add('disabled') :
      this.nextButton.classList.remove('disabled');
  }

  togglePrevButton(pageNum) {
    pageNum === 1 ?
      this.prevButton.classList.add('disabled') :
      this.prevButton.classList.remove('disabled');
  }
}