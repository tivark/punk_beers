import {createElWithClass} from "../helpers/helpers.js";

export default class MessagePopUp {
  constructor(message, messageType = 'error') {
    this.message = message;
    this.messageType = messageType;

    this.createHtml();
    this.displayMessage();
  }

  createHtml() {
    this.messagePopup = createElWithClass('div', `message-${this.messageType}`);
    const content = createElWithClass('span', 'message-content');
    const messageText = createElWithClass('div', 'message-content__text');
    this.closeButton = createElWithClass('spav', 'message-content__close-button');
    this.closeButton.addEventListener('click', ()=>{
      this.hideMessage();
    });


    messageText.innerText = this.message;

    content.append(messageText, this.closeButton);
    this.messagePopup.append(content);
  }

  displayMessage() {
    document.querySelector('body').append(this.messagePopup);
    const windowHeight = this.getFullHeight(this.messagePopup);
    this.messagePopup.style.top = `-${windowHeight}px`;
    setTimeout(() => {
      this.messagePopup.style.top = `0px`;
    }, 10);
    setTimeout(() => {
      this.hideMessage();
    }, 3000);
  }

  hideMessage() {
    const windowHeight = this.getFullHeight(this.messagePopup);
    this.messagePopup.style.top = `-${windowHeight}px`;

    setTimeout(() => {
      this.messagePopup.remove();
    }, 200);
  }

  getFullHeight(el) {
    const styles = window.getComputedStyle(el);
    const paddingTop = styles.getPropertyValue('padding-top');
    const paddingBottom = styles.getPropertyValue('padding-bottom');
    const height = styles.getPropertyValue('height');
    return Number.parseInt(paddingTop) + Number.parseInt(paddingBottom) + Number.parseInt(height);
  }
}