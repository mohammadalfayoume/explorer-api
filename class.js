"use strict";

/*----------lab 07----------*/
class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

/*----------lab 08 (weather)----------*/
class Weather {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

/*----------lab 08 (movie)----------*/
class Movie {
  constructor(city) {
    this.title = city.original_title;
    this.overview = city.overview;
    this.average_votes = city.vote_average;
    this.total_votes = city.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${city.poster_path}`;
    this.popularity = city.popularity;
    this.released_on = city.release_date;
  }
}

module.exports = { Forecast, Weather, Movie };
