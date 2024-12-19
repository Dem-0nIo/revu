const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Validar que el cuerpo de la solicitud contenga las credenciales necesarias
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ message: "Username and password are required!" });
    }

    // Buscar el usuario en la base de datos
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) {
      console.log("User not found");
      return res.status(404).send({ message: "User Not Found" });
    }

    // Validar la contraseña
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      console.log("Invalid password");
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // Generar el token
    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 horas
    });

    // Obtener los roles del usuario
    const roles = await user.getRoles();
    const authorities = roles.map((role) => "ROLE_" + role.name.toUpperCase());

    console.log("Login successful");
    return res.status(200).send({
      id: user.id,
      username: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error in signin:", error.message);
    return res.status(500).send({ message: "Error in signin", error: error.message });
  }
};
