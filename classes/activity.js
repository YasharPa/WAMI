export class Activity {
  date = new Date();
  id = (Date.now + '').slice(-10);
  constructor(coords, review, rating) {
    this.coords = coords;
    this.review = review;
    this.rating = rating;
  }
}
