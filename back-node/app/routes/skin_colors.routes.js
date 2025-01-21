const express = require("express");
const router = express.Router();
const skinColorController = require("../controllers/skin_colors.controller");

// Route to get all departments
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.get("/api/skin_color", skinColorController.getSkinColors);
};