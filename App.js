import { ZOOMLEVEL } from '../config.js';
import { Workout } from './classes/workout.js';
import { Restaurant } from './classes/restaurant.js';

const inputType = document.querySelectorAll('form__input--type');
const form = document.querySelector('.form');
let inputReview = document.querySelector('.form__input--review');
let inputStarRating = document.querySelector('.rating');

let map, mapEvent, ratingScore;

export class App {
  #map;
  #mapEvent;
  #ratingScore;
  #activities = [];

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

    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value;
    let workout, restaurant;

    if (type === 'workout') {
      if (inputReview.value === '') return alert('Please enter your review!');
    }
    workout = new Workout(
      [lat, lng],
      'great workout place, i will come back again!',
      5
    );
    this.#activities.push(workout);
    console.log(workout);

    if (type === 'Restaurant') {
      if (inputReview.value === '') return alert('Please enter your review!');
    }
    restaurant = new Restaurant(
      [lat, lng],
      'great workout place, i will come back again!',
      5
    );
    this.#activities.push(restaurant);

    this.renderActivityMarker(restaurant);

    inputReview.value = '';
  }
  renderActivityMarker(activity) {
    L.marker(activity.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${activity.type}-popup`,
        })
      )
      .setPopupContent(
        `${activity.type}, ${this.#ratingScore ? this.#ratingScore : 0} stars`
      )
      .openPopup();
  }
}

const app = new App();
