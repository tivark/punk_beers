import 'regenerator-runtime/runtime';
import BeerApiService from './api/BeerApiService.js';
import UserInterface from './components/UserInterface.js';

const beerApi = new BeerApiService();

async function getBeerData() {
  const data = await beerApi.getData();
  const parrentNode = document.querySelector('.main-wrapper');
  const userInterface = new UserInterface(parrentNode);
}

getBeerData();