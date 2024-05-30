// script.js
const clientId = '9c22d91e62c64e6b8ea9ebc28dcdbf09';
const clientSecret = '5a668eeb19894b20a96ed0476d36a246';

async function getToken() {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  });
  const data = await result.json();
  return data.access_token;
}

async function getTracks(token) {
  const result = await fetch('https://api.spotify.com/v1/playlists/4por2jkYxDlupVTiRZkGxA/tracks', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await result.json();
  console.log(data);
  return data.items;
}

function createCarouselItem(track) {
  const item = document.createElement('div');
  item.classList.add('carousel-item');

  const img = document.createElement('img');
  img.classList.add('carousel-item__img');
  img.src = track.album.images[0].url;
  img.alt = track.name;
  
  const details = document.createElement('div');
  details.classList.add('carousel-item__details');

  const icons = document.createElement('div');

  const playIcon = document.createElement('img');
  playIcon.src = 'https://img.icons8.com/material-outlined/24/000000/play-button-circled.png';
  icons.appendChild(playIcon);

  const plusIcon = document.createElement('img');
  plusIcon.src = 'https://img.icons8.com/material-outlined/24/000000/plus.png';
  icons.appendChild(plusIcon);

  const title = document.createElement('p');
  title.classList.add('carousel-item__details--title');
  title.textContent = track.name;

  const subtitle = document.createElement('p');
  subtitle.classList.add('carousel-item__details--subtitle');
  subtitle.textContent = track.artists[0].name;

  details.appendChild(icons);
  details.appendChild(title);
  details.appendChild(subtitle);
  
  item.appendChild(img);
  item.appendChild(details);

  item.addEventListener('click', () => {
    window.location.href = track.external_urls.spotify;
  });

  return item;
}

async function loadCarousel() {
  const token = await getToken();
  const tracks = await getTracks(token);
  
  const carouselContainer = document.getElementById('carouselContainer');
  tracks.forEach(item => {
    const carouselItem = createCarouselItem(item.track);
    carouselContainer.appendChild(carouselItem);
  });
}

document.addEventListener('DOMContentLoaded', loadCarousel);
