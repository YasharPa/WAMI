import { ZOOMLEVEL } from '../config.js';
import { Workout } from './classes/workout.js';
import { Restaurant } from './classes/restaurant.js';
import { Hotel } from './classes/hotel.js';
import { ModalView } from './modal/modalView.js';

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
  modalView = new ModalView();

  constructor() {
    this._getPosition();
    this._getLocalStorage();

    form.addEventListener('submit', this._newActivity.bind(this));
    inputStarRating.addEventListener(
      'change',
      this._updateRatingScore.bind(this)
    );
    activitiesConteiner.addEventListener('click', e => {
      this._moveToPopup(e);
    });
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

    this.#activities.forEach(activity => {
      this._renderActivity(activity);
      this._renderActivityMarker(activity);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputReview.focus();
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

      activity = new Workout(
        [lat, lng],
        inputReview.value,
        inputStarRating.value
      );
    }

    if (type === 'restaurant') {
      if (inputReview.value === '') return alert('Please enter your review!');

      activity = new Restaurant([lat, lng], inputReview, inputStarRating);
    }

    if (type === 'hotel') {
      if (inputReview.value === '') return alert('Please enter your review!');

      activity = new Hotel([lat, lng], inputReview, inputStarRating);
    }

    this.#activities.push(activity);
    this._renderActivityMarker(activity);
    this._renderActivity(activity);
    this._hideFrom();
    this._setLocalStorage();
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
        <li class="activity activity--${activity.type}" data-id="${
      activity.id
    }">
        <h2 class="activity__title">${activity.description}</h2>
        <div class="activity__details">
        <span class="activity__icon">${activity.symbol}</span>
        <span class="activity__value">${
          activity.ratingScore === undefined ? '' : activity.ratingScore
        }</span>
        <span class="activity__unit">${activity.type}</span>
        </div>
        <div class="activity__details">
        <span class="activity__icon">⏱</span>
        <span class="activity__value">${new Date(activity.date)
          .toLocaleTimeString()
          .slice(0, 5)}</span>
          <span class="activity__unit">o'clock</span>
          </div>
          `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const activityElement = e.target.closest('.activity');

    if (!activityElement) return;

    const activity = this.#activities.find(
      active => active.id === activityElement.dataset.id
    );

    this.#map.setView(activity.coords, this.ZOOMLEVEL, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
    this.modalView._addModal();
    this.modalView._renderModal(activity);
  }
  _setLocalStorage() {
    localStorage.setItem('activities', JSON.stringify(this.#activities));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('activities'));

    if (!data) return;

    this.#activities = data;
  }
}

const app = new App();
