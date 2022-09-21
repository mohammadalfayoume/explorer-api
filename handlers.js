"use strict";
const weather = require("./data/weather.json");
const classes = require("./class");
const axios = require("axios");

/*----------lab 07 (get weather data from json file)----------*/
// http://localhost:3001/weather?searchQuery=amman&lat=lat&lon=lon
function weatherHandler(req, res) {
  let { searchQuery,lat,lon } = req.query;

  try {
    let selectedCity = weather.find((city) => {
      return city.city_name.toLowerCase() === searchQuery.toLowerCase() && parseInt(city.lat)===parseInt(lat) && parseInt(city.lon)===parseInt(lon);
    });
    let formattedCity = selectedCity.data.map((day) => {
      return new classes.Forecast(day);
    });
    res.status(200).send(formattedCity);
  } catch {
    res.status(500).send("Something went wrong.");
  }
}

/*----------lab 08 (get weather data from weather server)----------*/
// http://localhost:3001/secondWeather?key=api_key&lat=lat&lon=lon
function secondWeatherHandler(req, res) {
  const { lat, lon } = req.query;
  console.log(req.query);
  let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  try {
    axios.get(weatherURL).then((result) => {
      let formattedArr = result.data.data.map((day) => {
        return new classes.Weather(day);
      });
      res.status(200).send(formattedArr);
    });
  } catch (error) {
    res.status(404).send(error);
  }
}

/*----------lab 08 (get weather data from moviedb server)----------*/
// http://localhost:3001/movies?api_key=key&query=paris
function moviesHandler(req, res) {
  const { query } = req.query;
  // console.log(req.query);
  let movieURL = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&query=${query}`;
  // console.log(movieURL);
  try {
    axios.get(movieURL).then((result) => {
      // console.log(result.data.results);
      let formattedMovies = result.data.results.map((city) => {
        return new classes.Movie(city);
      });
      // console.log(formattedMovies);
      res.status(200).send(formattedMovies);
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { weatherHandler, secondWeatherHandler, moviesHandler };
