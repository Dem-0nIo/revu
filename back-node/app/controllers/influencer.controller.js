const db = require("../models");
const Influ = db.influ;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskstorage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-monkeywit-" + file.originalname);
  },
});

const fileUpload = multer({
  storage: diskstorage,
}).single("image");

exports.registerinfluencer = (req, res) => {
  const vart = req.body;

  // Save User to Database
  Influ.create({
    firstName: vart.firstName,
    lastName: vart.lastName,
    idUser: vart.idUser,
    cityNac: vart.cityNac,
    birthdayDate: vart.birthdayDate,
    year: vart.year,
    gender: vart.gender,
    eps: vart.eps,
    passport: vart.passport,
    displayName: vart.displayName,
    emailAddress: vart.emailAddress,
    phoneNumber: vart.phoneNumber,
    addressLine: vart.addressLine,
    addressLine2: vart.addressLine2,
    city: vart.city,
    state: vart.state,
    zip: vart.zip,
    emailNotification: vart.emailNotification,
    pushNotification: vart.pushNotification,
    phoneNumberWhp: vart.phoneNumberWhp,
    socialInstagram: vart.socialInstagram,
    socialInstagramCla: vart.socialInstagramCla,
    socialInstagramSeg: vart.socialInstagramSeg,
    socialTik: vart.socialTik,
    socialTikCla: vart.socialTikCla,
    socialTikSeg: vart.socialTikSeg,
    socialNetwork: vart.socialNetwork,
    img: "/",
    costo_1: vart.costo_1,
    costo_2: vart.costo_2,
    costo_3: vart.costo_3,
  })
    .then(() => {
      res.status(200).send("se ingreso con exito");
      console.log("se ingreso con exito");
    })
    .catch((err) => {
      res.status(500).send("Se presenta un error, intentelo mas tarde");
      console.error(err); // Update to console.error for better error logging
    });
};

exports.registerinflu = (req, res, fileUpload) => {
  const body = req.body;
  const type = req.file.mimetype;
  const name = req.file.originalname;
  const data = fs.readFileSync(
    path.join(__dirname, "../images/" + req.file.filename)
  );
  // console.log(body);
  console.log(__dirname, "../images/" + req.file.filename);
  // Save User to Database
  Influ.create({
    firstName: req.body.name,
    lastName: req.body.lastName,
    idUser: req.body.idUser,
    cityNac: req.body.cityNac,
    birthdayDate: req.body.birthdayDate,
    year: req.body.year,
    gender: req.body.gender,
    eps: req.body.eps,
    passport: req.body.passport,
    displayName: req.body.displayName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    addressLine: req.body.addressLine,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    emailNotification: req.body.emailNotification,
    pushNotification: req.body.pushNotification,
    phoneNumberWhp: req.body.phoneNumberWhp,
    socialInstagram: req.body.socialInstagram,
    socialInstagramCla: req.body.socialInstagramCla,
    socialInstagramSeg: req.body.socialInstagramSeg,
    socialTik: req.body.socialTik,
    socialTikCla: req.body.socialTikCla,
    socialTikSeg: req.body.socialTikSeg,
    socialNetwork: req.body.socialNetwork,
    img: "/" + req.file.filename,
    costo_1: req.body.costo_1,
    costo_2: req.body.costo_2,
    costo_3: req.body.costo_3,
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

exports.editInfluencer = (req, res) => {
  const updatedData = req.body.values;
  const idUser = updatedData.idUser;

  Influ.update(updatedData, {
    where: { idUser: idUser },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Influencer was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Influencer with id=${id}. Maybe Influencer was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Influencer with id=" + id,
      });
      console.error(err);
    });
};

exports.deleteInfluencer = (req, res) => {
  const id = req.body.id;

  Influ.destroy({
    where: { idUser: id },
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

// exports.deleteInfluencer = (req, res) => {
//   const updatedData = req.body;
//   const idUser = updatedData.idUser;

//   Influ.destroy({
//     where: { idUser: idUser },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Influencer was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Influencer with idUser=${idUser}. Maybe Influencer was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Influencer with idUser=" + idUser,
//       });
//       console.error(err);
//     });
// };

exports.allAccess = (req, res) => {
  // Find all influencers
  Influ.findAll()
    .then((data) => {
      res.send(data);
      //console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.clasificacion = (req, res) => {
  // Find all influencers
  Influ.findAll()
    .then((data) => {
      res.send(data);
      //console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
