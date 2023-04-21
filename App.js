import { ZOOMLEVEL } from '../config.js';
import { Workout } from './classes/workout.js';
import { Restaurant } from './classes/restaurant.js';

const inputType = document.querySelector('.form__input--type');
const form = document.querySelector('.form');
const activitiesConteiner = document.querySelector('.activities');
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
    activitiesConteiner.addEventListener('click', this._moveToPopup.bind(this));
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
  _hideFrom() {
    inputReview.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }
  _newActivity(e) {
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value;
    let activity;

    if (type === 'workout') {
      if (inputReview.value === '') return alert('Please enter your review!');
    }
    activity = new Workout(
      [lat, lng],
      'great workout place, i will come back again!',
      5
    );

    if (type === 'restaurant') {
      if (inputReview.value === '') return alert('Please enter your review!');
      console.log(restaurant);
    }
    activity = new Restaurant(
      [lat, lng],
      'great workout place, i will come back again!',
      3
    );

    this.#activities.push(activity);
    this._renderActivityMarker(activity);
    this._renderActivity(activity);
    this._hideFrom();
  }
  _renderActivityMarker(activity) {
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
  _renderActivity(activity) {
    const html = `
    <li class="activity activity--${activity.type}" data-id="${activity.id}">
        <h2 class="activity__title">${activity.description}</h2>
        <div class="activity__details">
        <span class="activity__icon">${
          activity.type === 'workout' ? '🏋️‍♂️' : '⭐'
        }</span>
        <span class="activity__value">${activity.rating}</span>
        <span class="activity__unit">stars</span>
      </div>
      <div class="activity__details">
        <span class="activity__icon">⏱</span>
        <span class="activity__value">${activity.date.getHours()}:${activity.date.getMinutes()}</span>
        <span class="activity__unit">o'clock</span>
      </div>
    `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const activityElement = e.target.closest('.activity');
    console.log(activityElement);

    if (!activityElement) return;

    const activity = this.#activities.find(
      active => active.id === activityElement.dataset.id
    );
    console.log(this.#activities);
    this.#map.setView(activity.coords, this.ZOOMLEVEL, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

const app = new App();
