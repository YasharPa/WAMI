import { Activity } from './activity.js';

export class Restaurant extends Activity {
  type = 'restaurant';
  symbol = '🍽️';

  constructor(coords, review, rating) {
    super(coords, review, rating);
    this._setDescription();
  }
}
