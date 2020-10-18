function createElWithClass(tagName, className){
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
}

function setButtonEffect(element, color = '#ffffff'){
  element.addEventListener('mousedown', (event)=>{
    event.target.classList.add('button-click');
  });
  element.addEventListener('mouseup', (event)=>{
    event.target.classList.remove('button-click');
  });
}

function createFormField({label, placeholder, prompt}){
  const fieldsWrapper = createElWithClass('div', '')
}

function getClassFromLabel(label){
  const words =  label.split(' ');
  return words.length === 1 ?
    words[0].toLocaleLowerCase() :
    words.join('-').toLocaleLowerCase();
}

function getNameFromLabel(label){
  const words =  label.split(' ');
}

export {
  createElWithClass,
  setButtonEffect,
  createFormField
}