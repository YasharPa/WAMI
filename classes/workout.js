import { Activity } from './Activity.js';
export class Workout extends Activity {
  constructor(coords, review, rating) {
    super(coords, review, rating);
  }
}
const workout = new Activity([31, 34], 'awsome', 5);
console.log(workout);
