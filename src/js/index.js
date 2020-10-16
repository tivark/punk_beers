import 'regenerator-runtime/runtime';
import BeerApiService from './api/BeerApiService.js';
import AppInterface from './components/AppInterface.js';

const beerApi = new BeerApiService();


const parentNode = document.querySelector('.main-wrapper');
const appInterface = new AppInterface(parentNode);