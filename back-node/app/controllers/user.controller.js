const db = require("../models");
const config = require("../config/auth.config");
var bcrypt = require("bcryptjs");

const User = db.user;
const userRoles = db.roles;

const Op = db.Sequelize.Op;

const checkIfUsernameExists = async (username) => {
  const user = await User.findOne({
    where: { username: username },
  });
  return user;
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo a ocurrido consultando los usuarios.",
      });
    });
};

exports.assignUserRole = (req, res) => {
  const body = req.body;
  // console.log("respondiendo back", req.body);
  // Save User to Database
  userRoles
    .create({
      roleId: Number(body.rol),
      userId: Number(body.idUser),
    })
    .then((user) => {
      res.send({ message: "Rol creado correctamente" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.registerUser = async (req, res) => {
  //const body = req.body;
  //console.log(req.body);
  // Check if username already exists
  const user = await checkIfUsernameExists(req.body.displayName);
  if (user) {
    return res.status(400).send({
      message: "El nombre de usuario ya existe",
      userId: null,
    });
  }
  // Save User to Database
  try {
    const result = await User.create({
      username: req.body.displayName,
      email: req.body.emailAddress,
      password: bcrypt.hashSync(req.body.newPassword, 8),
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      phone: req.body.phone,
    });
    console.log(result.dataValues.id);

    res.status(201).send({
      message: "Usuario registrado exitosamente",
      userId: result.dataValues.id,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error al registrar usuario",
    });
  }
};

exports.editUser = (req, res) => {
  const updatedData = req.body.values;
  const id = updatedData.id;
  console.log("Data Back", updatedData, id);

  User.update(updatedData, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id=" + id,
      });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.body.id;
  User.destroy({
    where: { id: id },
  })
    .then(() => {
      res.send({
        message: "User was deleted successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the User.",
      });
    });
};
