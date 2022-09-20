"use strict";
const weather = require("./data/weather.json");
const classes = require("./class");
const axios = require("axios");

/*----------lab 07 (get weather data from json file)----------*/
// http://localhost:3001/weather?searchQuery=
function weatherHandler(req, res) {
  let { searchQuery } = req.query;

  try {
    let selectedCity = weather.find((city) => {
      return city.city_name.toLowerCase() === searchQuery.toLowerCase();
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

module.exports = { weatherHandler, secondWeatherHandler };
