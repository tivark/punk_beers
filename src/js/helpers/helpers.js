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

export {createElWithClass, setButtonEffect}