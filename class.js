"use strict";

/*----------lab 07----------*/
class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

/*----------lab 08----------*/
class Weather {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

module.exports = { Forecast, Weather };
