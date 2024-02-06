import { Notify } from 'notiflix/build/notiflix-notify-aio';

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY"
  });
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };

fetch("https://api.thecatapi.com/v1/breeds", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));