const { json } = require("sequelize");
const db = require("../models");
const Coti = db.cotizaciones;

exports.addCotizacion = (req, res) => {
  const vart = req.body;

  // Use the variables to create a new Coti object and save it
  Coti.create({
    idCotizacion: vart.idCotizacion,
    influencerId: vart.influencerId,
    numCotizacion: vart.numCotizacion,
    numContacto: vart.numContacto,
    personaContacto: vart.personaContacto,
    emailContacto: vart.emailContacto,
    whatsappContacto: vart.whatsappContacto,
    price: vart.price,
    dateCreated: Date.now(),
  })
    .then(() => {
      console.log("se ingreso con exito");
      res.status(200).send("se ingreso con exito");
    })
    .catch((err) => {
      res.status(500).send("Se presenta un error, intentelo mas tarde");
      console.log(err);
    });
};

exports.getAll = (req, res) => {
  // Find all cotizaciones
  Coti.findAll()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo a ocurrido consultando las cotizaciones.",
      });
    });
};

exports.getStatus = (req, res) => {
  // Find all cotizaciones
  if (!req.body.status) {
    return res.status(400).json({ error: 'Missing status in request body' });
  }
  console.log(req.body.status);
  Coti.findAll({
    where: {
      status: req.body.status,
    },
  })
    .then((data) => {
      res.status(200).json(data || []);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo a ocurrido consultando las cotizaciones.",
      });
    });
};

exports.editCotizacion = (req, res) => {
  const updatedData = req.body.values;
  const idCotizacion = updatedData.idCotizacion;

  Coti.update(updatedData, {
    where: { idCotizacion: idCotizacion },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cotizacion was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Cotización with id=${id}. Maybe Cotizacion was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Cotizacion with id=" + id,
      });
      console.error(err);
    });
};

exports.deleteCotizacion = (req, res) => {
  const id = req.body.id;
  Coti.destroy({
    where: { idCotizacion: id },
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
