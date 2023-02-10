class Vacation {
  constructor(
    id,
    description,
    location,
    starting_date,
    ending_date,
    price,
    image,
    followers
  ) {
    this.id = id;
    this.description = description;
    this.location = location;
    this.starting_date = starting_date;
    this.ending_date = ending_date;
    this.price = price;
    this.image = image;
    this.followers = followers;
  }
  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }

  getStartingDate() {
    return this.starting_date;
  }

  setStartingDate(startingDate) {
    this.starting_date = startingDate;
  }

  getEndingDate() {
    return this.ending_date;
  }

  setEndingDate(endingDate) {
    this.ending_date = endingDate;
  }

  getDuration() {
    return this.ending_date - this.starting_date;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price) {
    this.price = price;
  }

  getImage() {
    return this.image;
  }

  setImage(image) {
    this.image = image;
  }

  getFollowers() {
    return this.followers;
  }

  static parseDate(date) {
    return new Date(date).toISOString().split("T")[0];
  }
}

module.exports = Vacation;
