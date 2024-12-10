const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "*",
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/register", controller.registerUser);

  app.post("/api/user/delete", controller.deleteUser);

  app.post("/api/user/edituser", controller.editUser);

  app.post("/api/user/roluser", controller.assignUserRole);

  app.get("/api/user/all", controller.getAllUsers);
};
