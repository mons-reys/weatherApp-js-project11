import './style/style.css';
import Weather from './scripts/forcast.js';
import UpdateUI from './scripts/app.js';

//dom
const container = document.querySelector('.container');

//create a Weather instance
const weather = new Weather('xYf4MPBnV1uEFdAeUzd2Jt5VbxobLw9x');
const updateUI = new UpdateUI(container, weather);
updateUI.init();