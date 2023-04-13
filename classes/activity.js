import { v4 } from '../node_modules/uuid';

export class Activity {
  date = new Date();
  id = v4();
  constructor(coords, review, rating) {
    this.coords = coords;
    this.review = review;
    this.rating = rating;
  }
}
