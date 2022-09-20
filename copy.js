"use strict";

const { query } = require("express");
const express = require("express"); //import express framework using require method so
//I can use it
const server = express(); //put all predefiend method of express inside this variabl
require("dotenv").config(); // allow me to get var from .env file
const cors = require("cors");
server.use(cors());
const weather = require("./data/weather.json");

const PORT = process.env.PORT;

server.get("/", homeHandler);
server.get("/test", testHandler);
server.get("/weather", weatherHandler);
server.get("*", defaultHandler);

// http://localhost:3001/
function homeHandler(req, res) {
  res.send("Welecome from home route");
}
// http://localhost:3001/test
function testHandler(req, res) {
  res.send("Welecome from test route");
}

// http://localhost:3001/weather?searchQuery=
function weatherHandler(req, res) {
  let { searchQuery } = req.query;

  try {
    let selectedCity = weather.find((city) => {
      return city.city_name.toLowerCase() === searchQuery.toLowerCase();
    });
    let formattedCity = selectedCity.data.map((day) => {
      return new Forecast(day);
    });
    res.status(200).send(formattedCity);
  } catch {
    res.status(500).send("Something went wrong.");
  }
}

class Forecast {
  constructor(day) {
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description}`;
    this.date = day.valid_date;
  }
}

// http://localhost:3001/ssss
function defaultHandler(req, res) {
  res.send("Sorry, page not found");
}

server.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
