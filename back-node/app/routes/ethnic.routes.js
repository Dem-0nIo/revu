const express = require("express");
const router = express.Router();
const ethnicController = require("../controllers/ethnic.controller");

// Route to get all departments
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/ethnic", ethnicController.getEthnicGroup);
};