import {createElWithClass, setButtonEffect} from "../helpers/helpers.js";

class AutorizathionForm {
  constructor() {

  }

  createHtml() {
    const formLayer = createElWithClass('div', 'feedback-form-layer');
    const mainForm = createElWithClass('form', 'form-wrapper');
    mainForm.setAttribute('action', '');

    const phoneFieldsText = {
      label: 'Phone number',
      placeholder: 'Enter your phone number',
      prompt: 'Min 7 digits.'
    }

    const mailFieldsText = {
      label: 'E-mail',
      placeholder: 'Enter your e-mail',
      prompt: 'Enter your valid e-mail.'
    }

    const passwordFieldsText = {
      label: 'Password',
      placeholder: 'Enter your phone number',
      prompt: 'At least 6 characters.'
    }
  }
}