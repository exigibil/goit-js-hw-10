"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBreeds = fetchBreeds;
exports.fetchCatByBreed = fetchCatByBreed;
var _axios = _interopRequireDefault(require("axios"));
var _notiflixNotifyAio = require("notiflix/build/notiflix-notify-aio");
var _config = _interopRequireDefault(require("./config.ts"));
_axios.default.defaults.headers.common['x-api-key'] = _config.default.catApiKey;
_axios.default.defaults.headers.common['x-api-key'] = _config.default.catApiKey;
function fetchBreeds() {
  return _axios.default.get('https://api.thecatapi.com/v1/breeds').then(response => {
    console.log('Breeds data:', response.data); // Log the fetched data
    return response.data;
  }).catch(error => {
    console.error('Error fetching cat breeds:', error);
    throw error; // Rethrow the error to be caught by the caller
  });
}
function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return _axios.default.get(url).then(response => response.data).catch(error => {
    console.error('Error fetching cat by breed:', error);
    throw error; // Rethrow the error to be caught by the caller
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoDiv = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const errorElement = document.querySelector('.error'); // Select the error element

  function showLoader() {
    loader.style.display = 'block';
  }
  function hideLoader() {
    loader.style.display = 'none';
  }
  function showError() {
    errorElement.style.display = 'block'; // Show the error message
  }
  function hideError() {
    errorElement.style.display = 'none'; // Hide the error message
  }

  // Hide loader and error message initially
  hideLoader();
  hideError();
  breedSelect.addEventListener('change', event => {
    const selectedBreedId = event.target.value;
    showLoader();
    hideError(); // Hide error message when a new request starts
    fetchCatByBreed(selectedBreedId).then(catData => {
      hideLoader();
      const cat = catData[0];
      const imageUrl = cat.url;
      const name = cat.breeds[0].name;
      const description = cat.breeds[0].description;
      const temperament = cat.breeds[0].temperament;
      const img = document.createElement('img');
      img.src = imageUrl;
      catInfoDiv.innerHTML = '';
      catInfoDiv.appendChild(img);
      const info = document.createElement('div');
      info.innerHTML = `<p>Name: ${name}</p><p>Description: ${description}</p><p>Temperament: ${temperament}</p>`;
      catInfoDiv.appendChild(info);
    }).catch(error => {
      hideLoader();
      showError(); // Show error message when there's an error
      _notiflixNotifyAio.Notify.failure('Error fetching cat by breed: ' + error);
      console.error('Error fetching cat by breed:', error);
    });
  });
  showLoader(); // Show loader while fetching breeds
  fetchBreeds().then(breeds => {
    hideLoader();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  }).catch(error => {
    hideLoader();
    showError(); // Show error message when there's an error
    _notiflixNotifyAio.Notify.failure('Error fetching breeds: ' + error);
    console.error('Error fetching breeds:', error);
  });
});