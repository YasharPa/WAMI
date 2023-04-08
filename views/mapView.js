import { ZOOMLEVEL } from '../config.js';

const form = document.querySelector('.form');
let inputReview = document.querySelector('.form__input--review');
let starRating = document.querySelectorAll('.rating input');
const btnRating = starRating.forEach(star => {
  star.addEventListener('click', () => {
    console.log(star.value);
    return star.value;
  });
});
let map, mapEvent;

export function showMap() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, ZOOMLEVEL);

      L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on('click', mapE => {
        mapEvent = mapE;
        console.log(mapE);
        form.classList.remove('hidden');
        inputReview.focus();
      });
    },
    function (error) {
      console.error(error);
    }
  );
}

form.addEventListener('submit', e => {
  e.preventDefault();
  inputReview.value = '';
  starRating.forEach(star => (star.value = ''));

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('your review')
    .openPopup();
});
