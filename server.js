"use strict";

const { query } = require("express");
const express = require("express"); //import express framework using require method so
//I can use it
const server = express(); //put all predefiend method of express inside this variabl
require("dotenv").config(); // allow me to get var from .env file
const cors = require("cors");
server.use(cors());
const handlers = require("./handlers");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3001;

server.get("/", homeHandler);
server.get("/test", testHandler);
server.get("/weather", handlers.weatherHandler);
server.get("/secondWeather", handlers.secondWeatherHandler);
server.get("/movies", handlers.moviesHandler);
server.get("*", defaultHandler);

// http://localhost:3001/
function homeHandler(req, res) {
  res.send("Welecome from home route");
}
// http://localhost:3001/test
function testHandler(req, res) {
  res.send("Welecome from test route");
}

// http://localhost:3001/*
function defaultHandler(req, res) {
  res.send("Sorry, page not found");
}

server.listen(PORT, () => {
  console.log(`I am listening on port ${PORT}`);
});
