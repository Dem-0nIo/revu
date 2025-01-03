const controller = require("../controllers/cotizaciones.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/cotizaciones/all", controller.getAll);
  app.post("/api/cotizaciones/register", controller.addCotizacion);
  app.post("/api/cotizaciones/status", controller.getStatus);
  app.post("/api/cotizaciones/update", controller.editCotizacion);
  app.post("/api/cotizaciones/delete", controller.deleteCotizacion);
};
