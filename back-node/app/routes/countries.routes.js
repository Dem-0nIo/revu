const express = require("express");
const router = express.Router();
const countriesController = require("../controllers/country.controller");

// Route to get all cities
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/countries", countriesController.getAllCountries);
  };