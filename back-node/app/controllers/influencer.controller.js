const db = require("../models");
const Influ = db.influ;
const InfluencerSubcategories = db.InfluencerSubcategories;
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

exports.registerinfluencer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      idUser,
      birthdayDate,
      year,
      gender_id,
      hair_color_id,
      hair_type_id,
      skin_color_id,
      contact,
      passport,
      displayName,
      emailAddress,
      phoneNumber,
      addressLine,
      social_class_id,
      celebrity,
      country_id,
      emailNotification,
      pushNotification,
      phoneNumberWhp,
      socialInstagram,
      socialInstagramSeg,
      socialTik,
      socialTikSeg,
      socialFace,
      socialFaceSeg,
      socialUTube,
      socialUTubeSeg,
      socialNetwork,
      costo_1,
      costo_2,
      costo_3,
      costo_4,
      costo_5,
      costo_6,
      costo_7,
      costo_8,
      costo_9,
      costo_10,
      costo_11,
      costo_12,
      costo_13,
      subcategories,// Subcategories array from request
    } = req.body;

    console.log(JSON.stringify(req.body));

    // Determine classification based on socialInstagramSeg
    const matchedClass = await db.influencer_classes.findOne({
      where: {
        min_followers: { [db.Sequelize.Op.lte]: socialInstagramSeg },
        max_followers: { [db.Sequelize.Op.gte]: socialInstagramSeg },
      },
    });

    const classification = matchedClass ? matchedClass.class_name : "Unknown";

    // Save influencer to the database
    const newInfluencer = await Influ.create({
      firstName,
      lastName,
      idUser,
      birthdayDate,
      year,
      gender_id,
      hair_color_id,
      hair_type_id,
      skin_color_id,
      contact,
      passport,
      displayName,
      emailAddress,
      phoneNumber,
      addressLine,
      social_class_id,
      celebrity,
      country_id,
      emailNotification,
      pushNotification,
      phoneNumberWhp,
      socialInstagram,
      socialInstagramCla: classification,
      socialInstagramSeg,
      socialTik,
      socialTikCla: classification, // Add logic for TikTok classification if necessary
      socialTikSeg,
      socialFace,
      socialFaceCla: classification, // Add logic for TikTok classification if necessary
      socialFaceSeg,
      socialUTube,
      socialUTubeCla: classification, // Add logic for TikTok classification if necessary
      socialUTubeSeg,
      socialNetwork,
      img: "/", // Default image or logic to handle uploaded image
      costo_1,
      costo_2,
      costo_3,
      costo_4,
      costo_5,
      costo_6,
      costo_7,
      costo_8,
      costo_9,
      costo_10,
      costo_11,
      costo_12,
      costo_13,
    });

    console.log("Subcategories received:", subcategories);

    // Handle subcategories if provided
    if (subcategories && subcategories.length > 0) {
      console.log("Subcategories to save:", subcategories);
      const subcategoryData = subcategories.map((subcatId) => ({
        influencerId: newInfluencer.idUser,
        subcategoryId: subcatId,
      }));

      console.log("Subcategory data prepared:", subcategoryData);

      try {
        await db.InfluencerSubcategories.bulkCreate(subcategoryData);
        console.log("Subcategories saved successfully.");
      } catch (error) {
        console.error("Error saving subcategories:", error);
      }
    }

    // Send a success response
    res.status(201).json({ message: "Influencer created successfully", influencer: newInfluencer });
  } catch (error) {
    console.error("Error creating influencer:", error);

    // Manejar error de clave única (ID duplicado)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: "Error: ID duplicado",
        error: error.errors.map(err => err.message), // Extrae los mensajes detallados de MySQL
      });
    }

    // Ensure a single response is sent
    res.status(500).json({ message: "Error creating influencer", error: error.message });
  }
};

exports.registerinflu = async (req, res, fileUpload) => {
  const body = req.body;
  const type = req.file.mimetype;
  const name = req.file.originalname;
  const data = fs.readFileSync(
    path.join(__dirname, "../images/" + req.file.filename)
  );
  const { socialInstagramSeg } = req.body;

  // Validate and find the influencer class based on the number of followers
  const matchedClass = await db.influencer_classes.findOne({
    where: {
        min_followers: { [db.Sequelize.Op.lte]: socialInstagramSeg },
        max_followers: { [db.Sequelize.Op.gte]: socialInstagramSeg },
    },
  });

  // Add logic to handle the matched class (optional)
  const classification = matchedClass ? matchedClass.class_name : "Unknown";

  // Manejo de la imagen subida
  const filePath = req.file
    ? "/" + req.file.filename
    : "/default_image.jpg"; // Imagen por defecto si no se sube ninguna

  console.log(__dirname, "../images/" + req.file.filename);
  // Save User to Database
  const newInfluencer = await Influ.create({
    firstName: req.body.name,
    lastName: req.body.lastName,
    idUser: req.body.idUser,
    birthdayDate: req.body.birthdayDate,
    year: req.body.year,
    gender_id: Number.isNaN(parseInt(req.body.gender_id, 10)) ? -1 : parseInt(req.body.gender_id, 10),
    hair_color_id: Number.isNaN(parseInt(req.body.hair_color_id, 10)) ? -1 : parseInt(req.body.hair_color_id, 10),
    hair_type_id: Number.isNaN(parseInt(req.body.hair_type_id, 10)) ? -1 : parseInt(req.body.hair_type_id, 10),
    skin_color_id: Number.isNaN(parseInt(req.body.skin_color_id, 10)) ? -1 : parseInt(req.body.skin_color_id, 10),
    contact: req.body.contact,
    passport: req.body.passport,
    displayName: req.body.displayName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    addressLine: req.body.addressLine,
    social_class_id: Number.isNaN(parseInt(req.body.social_class_id, 10)) ? -1 : parseInt(req.body.social_class_id, 10),
    celebrity: String(parseInt(req.body.celebrity, 10)) ? "-1" : String(parseInt(req.body.celebrity, 10)),
    country_id: Number.isNaN(parseInt(req.body.country_id,10)) ? -1 : parseInt(req.body.country_id, 10),
    emailNotification: req.body.emailNotification,
    pushNotification: req.body.pushNotification,
    phoneNumberWhp: req.body.phoneNumberWhp,
    socialInstagram: req.body.socialInstagram,
    socialInstagramCla: classification,
    socialInstagramSeg: req.body.socialInstagramSeg,
    socialTik: req.body.socialTik,
    socialTikCla: classification,
    socialTikSeg: req.body.socialTikSeg,
    socialFace: req.body.socialTik,
    socialFaceCla: classification,
    socialFaceSeg: req.body.socialTikSeg,
    socialUTube: req.body.socialTik,
    socialUTubeCla: classification,
    socialUTubeSeg: req.body.socialTikSeg,
    socialNetwork: req.body.socialNetwork,
    img: "/" + req.file.filename,
    costo_1: req.body.costo_1,
    costo_2: req.body.costo_2,
    costo_3: req.body.costo_3,
    costo_4: req.body.costo_4,
    costo_5: req.body.costo_5,
    costo_6: req.body.costo_6,
    costo_7: req.body.costo_7,
    costo_8: req.body.costo_8,
    costo_9: req.body.costo_9,
    costo_10: req.body.costo_10,
    costo_11: req.body.costo_11,
    costo_12: req.body.costo_12,
    costo_13: req.body.costo_13,
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
