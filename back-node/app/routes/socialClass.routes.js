const express = require('express');
const router = express.Router();
const socialClassController = require('../controllers/socialClass.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    // Endpoint para obtener todas las clases sociales
    app.get('/api/social-classes', socialClassController.getSocialClasses);

    // Endpoint para agregar una nueva clase social
    app.post('/api/social-classes', socialClassController.addSocialClass);
    };
