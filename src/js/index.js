import 'regenerator-runtime/runtime';
import BeerApiService from './api/BeerApiService.js';
import ItemsBox from './components/ItemsBox.js';

const beerApi = new BeerApiService();

async function getBeerData() {
  const data = await beerApi.getData();
  const parrentNode = document.querySelector('.main-wrapper');
  const itemsBox = new ItemsBox(parrentNode, data);
  itemsBox.renderElements();
}

getBeerData();