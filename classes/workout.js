import { Activity } from './activity.js';

export class Workout extends Activity {
  type = 'workout';
  constructor(coords, review, rating) {
    super(coords, review, rating);
    this._setDescription();
  }
}
