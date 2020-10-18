import {createElWithClass, setButtonEffect} from "../helpers/helpers.js";

export default class AutorizathionForm {
  constructor() {
    this.display();
  }

  createHtml() {
    this.formLayer = createElWithClass('div', 'feedback-form-layer');
    const formTitle = createElWithClass('span', 'form-title');
    formTitle.innerText = 'Registration form';
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

    const phoneField = this.createFormField(phoneFieldsText);
    const mailField = this.createFormField(mailFieldsText);
    const passwordField = this.createFormField(passwordFieldsText);
    const buttonsWrapper = createElWithClass('span', 'form__buttons-wrapper');
    const submitButton = createElWithClass('button', 'form__submit-button');
    submitButton.innerText = 'Submit';

    const cancelButton = createElWithClass('button', 'form__cancel-button');
    cancelButton.innerText = 'Cancel';

    buttonsWrapper.append(submitButton, cancelButton);

    mainForm.append(
      formTitle,
      phoneField,
      mailField,
      passwordField,
      buttonsWrapper
    );

    this.formLayer.append(mainForm);
  }

  createFormField({label, placeholder, prompt}) {
    const fieldClassName = this.labelToClassName(label);
    const fieldWrapper = createElWithClass('div', `${fieldClassName}-field`);
    const labelTag = createElWithClass('label', `${fieldClassName}__label`);
    labelTag.setAttribute('for', fieldClassName);
    labelTag.innerText = label;

    const textField = createElWithClass('input', `${fieldClassName}__text`);
    textField.setAttribute('id', fieldClassName);
    textField.setAttribute('placeholder', placeholder);

    const promptField = createElWithClass('span', `${fieldClassName}__prompt`);
    promptField.innerText = prompt;

    fieldWrapper.append(labelTag, textField, promptField);

    return fieldWrapper;
  }

  labelToClassName(label) {
    return label.toLowerCase().replaceAll(/\s/g, '-');
  }

  display() {
    this.createHtml();
    document.querySelector('body').append(this.formLayer);
  }
}