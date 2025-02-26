const db = require("../models");
const Influ = db.influ;
const InfluencerSubcategories = db.InfluencerSubcategories;
const SubCategory = db.SubCategory;
const TagsCategory = db.TagsCategory;
const SocialClass = db.SocialClass;
const { Op } = require("sequelize");
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
    req.body.celebrity = 0;
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


exports.getFilteredInfluencers = async (req, res) => {
  try {
    //const { category_id } = req.query; // Get category ID from request
    
    const {
      category_id,       // Categoría
      socialNetwork,     // Red Social
      influencerSize,    // Tamaño de Influencer
      country,           // País
      city,              // Ciudad
      gender,            // Sexo
      age,               // Edad
      socialClass,       // Clase Social
      hairType,          // Tipo de cabello
      hairColor,         // Color de cabello
      skinColor,         // Color de piel
      isCelebrity,       // Celebrity
      isUGC              // UGC (User Generated Content)
    } = req.query;

    let whereClause = {};

    if (category_id) whereClause['$influencerSubcategories.subcategory.category.id$'] = category_id;
    if (socialNetwork) whereClause['socialNetwork'] = socialNetwork;
    if (influencerSize) whereClause['influencerSize'] = influencerSize;
    if (country) whereClause['country_id'] = country;  // Cambio de country a country_id ✅
    if (city) whereClause['city_id'] = city;  // Cambio de city a city_id ✅
    if (gender) whereClause['gender_id'] = gender;  // Cambio de gender a gender_id ✅
    if (age) whereClause['year'] = age;  // Si el año representa la edad
    if (socialClass) whereClause['social_class_id'] = socialClass;  // Cambio de socialClass a social_class_id ✅
    if (hairType) whereClause['hair_type_id'] = hairType;  // Cambio de hairType a hair_type_id ✅
    if (hairColor) whereClause['hair_color_id'] = hairColor;  // Cambio de hairColor a hair_color_id ✅
    if (skinColor) whereClause['skin_color_id'] = skinColor;  // Cambio de skinColor a skin_color_id ✅
    if (isCelebrity !== undefined) whereClause['celebrity'] = isCelebrity === 'true';
    if (isUGC !== undefined) whereClause['isUGC'] = isUGC === 'true';


    const influencers = await Influ.findAll({
      attributes: ['idUser', 'displayName', 'socialInstagram', 'socialInstagramCla', 'socialTik', 'socialTikCla', 'socialFace', 'socialFaceCla', 'socialUTube', 'socialUTubeCla'],
      where: whereClause,
      include: [
        {
          model: InfluencerSubcategories,
          as: 'influencerSubcategories',
          include: [
            {
              model: SubCategory,
              as: 'subcategory',
              include: [
                {
                  model: TagsCategory,
                  as: 'category'
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(200).json(influencers);
  } catch (error) {
    console.error("Error fetching influencers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};