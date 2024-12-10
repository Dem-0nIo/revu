const { authJwt } = require("../middleware");
const controller = require("../controllers/influencer.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("../models");
const Influ = db.influ;

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-influ-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/influencer/all", controller.allAccess);

  app.get("/api/influencer/calsificacion", controller.clasificacion);

  app.post("/api/influencer/update", controller.editInfluencer);

  app.post("/api/influencer/delete", controller.deleteInfluencer);

  app.post("/api/influencer/register", controller.registerinfluencer);

  app.post("/images/post", fileUpload, controller.registerinflu);
};
