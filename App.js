import { ZOOMLEVEL } from '../config.js';

const inputTYpe = document.querySelectorAll('form__input--type');
const form = document.querySelector('.form');
let inputReview = document.querySelector('.form__input--review');
let inputStarRating = document.querySelector('.rating');

let map, mapEvent, ratingScore;

export class App {
  #map;
  #mapEvent;
  #ratingScore;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newActivity.bind(this));
    inputStarRating.addEventListener(
      'change',
      this._updateRatingScore.bind(this)
    );
  }
  _updateRatingScore(e) {
    this.#ratingScore = e.target.value;
  }
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function (error) {
        console.error(error);
      }
    );
  }
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, ZOOMLEVEL);

    L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputReview.focus();
    console.log(mapE);
  }
  _newActivity(e) {
    e.preventDefault();
    console.log(this);
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent(`Workout, ${this.#ratingScore} stars`)
      .openPopup();
    console.log(inputReview.value);
    console.log(this.#ratingScore);
    inputReview.value = '';
  }
}

const app = new App();
