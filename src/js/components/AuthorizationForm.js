import {createElWithClass} from "../helpers/helpers.js";

export default class AutorizationForm {
  constructor() {
    this.phoneFieldsText = this.createTextObj('Phone number',
      'Enter your phone number',
      'Min 7 digits.');

    this.mailFieldsText = this.createTextObj('E-mail',
      'Enter your e-mail',
      'Enter your valid e-mail.');

    this.passwordFieldsText = this.createTextObj('Password',
      'Enter your password',
      'At least 6 characters.');

    this.validFields = {
      phone: false,
      email: false,
      password: false
    }

    this.display();
  }

  createHtml() {
    this.formLayer = createElWithClass('div', 'feedback-form-layer');
    const formTitle = createElWithClass('span', 'form-title');
    formTitle.innerText = 'Registration form';
    const mainForm = createElWithClass('form', 'form-wrapper');
    mainForm.setAttribute('action', '');
    mainForm.setAttribute('id', 'reg-form');

    this.phoneField = this.createFormField(this.phoneFieldsText);
    this.mailField = this.createFormField(this.mailFieldsText);
    this.passwordField = this.createFormField(this.passwordFieldsText);
    const buttonsWrapper = createElWithClass('span', 'form__buttons-wrapper');

    this.submitButton = createElWithClass('button', 'form__submit-button');
    this.submitButton.classList.add('disabled');
    this.submitButton.setAttribute('form', 'reg-form');
    this.submitButton.setAttribute('disabled', 'disabled');
    this.submitButton.innerText = 'Submit';

    this.cancelButton = createElWithClass('button', 'form__cancel-button');
    this.cancelButton.setAttribute('type', 'button');
    this.cancelButton.innerText = 'Cancel';

    buttonsWrapper.append(this.submitButton, this.cancelButton);

    mainForm.append(
      formTitle,
      this.phoneField,
      this.mailField,
      this.passwordField,
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
    if (fieldClassName === 'password') {
      textField.setAttribute('type', 'password');
    }

    const promptField = createElWithClass('span', `${fieldClassName}__prompt`);
    promptField.innerText = prompt;

    fieldWrapper.append(labelTag, textField, promptField);

    return fieldWrapper;
  }

  setListeners() {
    this.formLayer.addEventListener('input', (event) => {
      const field = event.target;
      const fieldClassName = field.classList[0];
      let isValid, fieldName, regexMatch;

      switch (fieldClassName) {
        case 'phone-number__text':
          regexMatch = field.value.match(/\d{7,}/);
          isValid = (regexMatch != null) && (regexMatch[0] === field.value);
          fieldName = 'phone';
          break;
        case 'e-mail__text':
          const mailRegexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
          regexMatch = field.value.match(mailRegexp);
          isValid = (regexMatch != null) && (regexMatch[0] === field.value);
          fieldName = 'email';
          break;
        case 'password__text':
          isValid = (field.value.length >= 6);
          fieldName = 'password';
          break;
      }
      this.setValidStatus(fieldName, field, isValid);
      this.checkSubmitButtonStatus();
    });

    this.formLayer.addEventListener('click', (event) => {
      if ((event.target === event.currentTarget) ||
        (event.target.classList[0] === 'form__cancel-button')) {
        this.removeForm();
      }
    });
  }

  createTextObj(labelText, placeholderText, promptText) {
    return {
      'label': labelText,
      'placeholder': placeholderText,
      'prompt': promptText
    };
  }

  labelToClassName(label) {
    return label.toLowerCase().replaceAll(/\s/g, '-');
  }

  display() {
    this.createHtml();
    document.querySelector('body').append(this.formLayer);
    this.setListeners();
    this.formLayer.querySelector('form').style.transform = 'translateX(-50%) scale(1)';
  }

  setValidStatus(fieldName, fieldNode, validStatus) {
    validStatus ?
      fieldNode.style.borderColor = '#12b000' :
      fieldNode.style.borderColor = '#b00020';

    this.validFields[fieldName] = validStatus;
  }

  checkSubmitButtonStatus() {
    const {phone, email, password} = this.validFields;

    if (phone && email && password) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.remove('disabled');
    } else {
      if (!this.submitButton.getAttribute('disable')) {
        this.submitButton.setAttribute('disabled', 'disabled');
      }
      if (!this.submitButton.classList.contains('disabled')) {
        this.submitButton.classList.add('disabled');
      }
    }
  }

  removeForm() {
    const mainForm = this.formLayer.querySelector('form');
    mainForm.style.transform = 'translateX(-50%) scale(0.1)';
    setTimeout(() => {
      this.formLayer.remove();
    }, 200);
  }
}