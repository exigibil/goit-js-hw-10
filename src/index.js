import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import config from './config';

const apiKey = config.catApiKey;

const axiosRequest = axios.get("https://api.thecatapi.com/v1/breeds", {
  headers: {
    'x-api-key': apiKey
  }
})
  .then(response => response.data)
  .catch(error => {
    console.error('Error fetching cat breeds using Axios:', error);
    return []; // Return an empty array in case of error
  });



const fetchRequest = fetch("https://api.thecatapi.com/v1/breeds", {
  headers: {
    'x-api-key': apiKey
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => data)
  .catch(error => {
    console.error('Error fetching cat breeds using fetch:', error);
    return []; // Return an empty array in case of error
  });

  Promise.all([axiosRequest, fetchRequest])
  .then(([axiosResponse, fetchResponse]) => {
    const combinedArray = [...axiosResponse, ...fetchResponse];
    console.log('Combined Array:', combinedArray);
  })
  .catch(error => {
    console.error('Error combining responses:', error);
  });