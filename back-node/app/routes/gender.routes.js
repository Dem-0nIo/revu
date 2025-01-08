const express = require("express");
const router = express.Router();
const genderController = require("../controllers/gender.controller");

// Route to get all genders
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/genders", genderController.getAllGenders);
  };