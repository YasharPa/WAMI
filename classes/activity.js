export class Activity {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, review, rating) {
    this.coords = coords;
    this.review = review;
    this.rating = rating;
    this._setDescription();
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}
    `;
  }
}
