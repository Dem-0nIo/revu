const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/cities.controller");

// Route to get all cities
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/cities", citiesController.getAllCities);
    app.get("/api/cities/colombia", citiesController.getCitiesWithDepartmentsForColombia);  
};