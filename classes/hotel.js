import { Activity } from './activity.js';

export class Hotel extends Activity {
  type = 'hotel';
  symbol = '🏩';

  constructor(coords, review, rating) {
    super(coords, review, rating);
    this._setDescription();
  }
}
