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
    // req.body.celebrity = 0;
    // req.body.isUGC = 0;
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
      displayName,
      emailAddress,
      phoneNumber,
      addressLine,
      social_class_id,
      celebrity,
      isUGC,
      country_id,
      city_id,
    //  state_id,
      emailNotification,
      pushNotification,
      phoneNumberWhp,
      socialInstagram,
      socialInstagramCla,
      socialInstagramSeg,
      socialTik,
      socialTikCla,
      socialTikSeg,
      socialFace,
      socialFaceCla,
      socialFaceSeg,
      socialUTube,
      socialUTubeCla,
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
      subcategories,// Subcategories array from request
    } = req.body;

    console.log("Body a guardar ",JSON.stringify(req.body));

    const socialNetworks = [];

    if (socialInstagram) socialNetworks.push("socialInstagram");
    if (socialTik) socialNetworks.push("socialTiktok");
    if (socialFace) socialNetworks.push("socialFacebook");
    if (socialUTube) socialNetworks.push("socialYoutube");

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
      displayName,
      emailAddress,
      phoneNumber,
      addressLine,
      social_class_id,
      celebrity,
      isUGC,
      country_id,
      city_id,
      // state_id,
      emailNotification,
      pushNotification,
      phoneNumberWhp,
      socialInstagram,
      socialInstagramCla,
      socialInstagramSeg,
      socialTik,
      socialTikCla, 
      socialTikSeg,
      socialFace,
      socialFaceCla, 
      socialFaceSeg,
      socialUTube,
      socialUTubeCla, 
      socialUTubeSeg,
      socialNetwork: JSON.stringify(socialNetworks),
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
    });

    // Registrar la creación en la tabla de auditoría
    try {
      await db.sequelize.query(
        'INSERT INTO influencer_creations (influencer_id, user_id) VALUES (?, ?)',
        {
          replacements: [newInfluencer.idUser, idUser],
          type: db.Sequelize.QueryTypes.INSERT
        }
      );
      console.log("✅ Influencer creation registrada en auditoría.");
    } catch (auditErr) {
      console.error("❌ Error registrando auditoría de creación:", auditErr);
    }

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
    displayName: req.body.displayName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    addressLine: req.body.addressLine,
    social_class_id: Number.isNaN(parseInt(req.body.social_class_id, 10)) ? -1 : parseInt(req.body.social_class_id, 10),
    celebrity: String(parseInt(req.body.celebrity, 10)) ? "-1" : String(parseInt(req.body.celebrity, 10)),
    isUGC: String(parseInt(req.body.isUGC, 10)) ? "-1" : String(parseInt(req.body.isUGC, 10)),
    country_id: Number.isNaN(parseInt(req.body.country_id,10)) ? -1 : parseInt(req.body.country_id, 10),
    city_id: Number.isNaN(parseInt(req.body.city_id,10)) ? -1 : parseInt(req.body.city_id, 10),
    emailNotification: req.body.emailNotification,
    pushNotification: req.body.pushNotification,
    phoneNumberWhp: req.body.phoneNumberWhp,
    socialInstagram: req.body.socialInstagram,
    socialInstagramCla: req.body.socialInstagramCla,
    socialInstagramSeg: req.body.socialInstagramSeg,
    socialTik: req.body.socialTik,
    socialTikCla: req.body.socialTikCla,
    socialTikSeg: req.body.socialTikSeg,
    socialFace: req.body.socialTik,
    socialFaceCla: req.body.socialFaceCla,
    socialFaceSeg: req.body.socialTikSeg,
    socialUTube: req.body.socialTik,
    socialUTubeCla: req.body.socialUTubeCla,
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

exports.editInfluencer = async (req, res) => {
  console.log("values received by backend ",req.body.values);
  const updatedData = req.body.values;
  const idUser = updatedData.idUser;
  const newSubcategories = updatedData.subcategories;

  if (!idUser) {
    return res.status(400).json({ message: "Error: idUser is required" });
  }

  try {
    // Step 1: Update influencer's main details
    const [numUpdated] = await Influ.update(updatedData, { // ✅ Now this works!
      where: { idUser },
    });

    if (numUpdated !== 1) {
      return res.status(404).json({ message: "Influencer not found or no changes made" });
    }

    console.log("✅ Influencer updated successfully.");

    // Step 2: Update influencer's subcategories
    if (Array.isArray(newSubcategories)) {
      console.log("🔄 Updating subcategories...");

      // Delete existing subcategories for this influencer
      await InfluencerSubcategories.destroy({
        where: { influencerId: idUser },
      });

      console.log("🗑️ Deleted old subcategories.");

      // Insert new subcategories
      const subcategoryData = newSubcategories.map((subcategoryId) => ({
        influencerId: idUser,
        subcategoryId,
      }));

      await InfluencerSubcategories.bulkCreate(subcategoryData);
      console.log("✅ New subcategories inserted:", subcategoryData);
    }

    res.json({ message: "Influencer updated successfully" });

  } catch (error) {
    console.error("❌ Error updating influencer:", error);
    res.status(500).json({ message: "Error updating influencer", error: error.message });
  }

  /* Influ.update(updatedData, {
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
      message: "Error updating Influencer with id=" + idUser,
    });
    console.error(err);
  }); */
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

exports.getAllInfluencersWithCategories = async (req, res) => {
  try {
    const influencers = await Influ.findAll({
      attributes: [
        'idUser',
        'displayName',
        'socialInstagram',
        'socialInstagramCla',
        'socialTik',
        'socialTikCla',
        'socialFace',
        'socialFaceCla',
        'socialUTube',
        'socialUTubeCla'
      ],
      include: [
        {
          model: InfluencerSubcategories,
          as: 'influencerSubcategories',
          include: [
            {
              model: SubCategory,
              as: 'subcategories',
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

    const formattedInfluencers = influencers.map(influencer => {
      return {
        idUser: influencer.idUser,
        displayName: influencer.displayName,
        socialInstagram: influencer.socialInstagram,
        socialInstagramCla: influencer.socialInstagramCla,
        socialTik: influencer.socialTik,
        socialTikCla: influencer.socialTikCla,
        socialFace: influencer.socialFace,
        socialFaceCla: influencer.socialFaceCla,
        socialUTube: influencer.socialUTube,
        socialUTubeCla: influencer.socialUTubeCla,
        categories: influencer.influencerSubcategories.map(sub => ({
          category: sub.subcategory?.category?.category_name || "N/A",
          subcategory: sub.subcategory?.subcategory_name || "N/A",
          subcategory_id: sub.subcategory?.id || "N/A"
        }))
      };
    });

    res.status(200).json(formattedInfluencers);
  } catch (error) {
    console.error("Error fetching influencers with categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getFilteredInfluencers = async (req, res) => {
  try {
    console.log("📌 Recibidos parámetros de consulta:", req.query); // Debugging

    const {
      category_id,
      socialNetwork,
      socialInstagramCla,
      socialFaceCla,
      socialTikCla,
      socialUTubeCla,
      country_id,  // Estado (departamento)
      city_id,   // Ciudad
      gender_id, // Género
      year,      // Año (posible filtro de edad)
      social_class_id,
      hair_type_id,
      hair_color_id,
      skin_color_id,
      celebrity,
      isUGC,
      search
    } = req.query;

    let whereClause = {[Op.and]: [] };

    // Agregar filtros con los nombres de columna correctos
    if (category_id) whereClause[Op.and].push({ '$influencerSubcategories.subcategory.category.id$': category_id });
    if (country_id) whereClause[Op.and].push({ country_id: parseInt(country_id, 10) });
    if (socialInstagramCla) whereClause[Op.and].push({ socialInstagramCla});
    if (socialFaceCla) whereClause[Op.and].push({ socialFaceCla});
    if (socialTikCla) whereClause[Op.and].push({ socialTikCla});
    if (socialUTubeCla) whereClause[Op.and].push({ socialUTubeCla});
    if (city_id) whereClause[Op.and].push({ city_id: parseInt(city_id, 10) });
    if (gender_id) whereClause[Op.and].push({ gender_id: parseInt(gender_id, 10) });
    if (year) whereClause[Op.and].push({year});
    if (social_class_id) whereClause[Op.and].push({ social_class_id: parseInt(social_class_id, 10) });
    if (hair_type_id) whereClause[Op.and].push({ hair_type_id: parseInt(hair_type_id, 10) });
    if (hair_color_id) whereClause[Op.and].push({ hair_color_id: parseInt(hair_color_id, 10) });
    if (skin_color_id) whereClause[Op.and].push({ skin_color_id: parseInt(skin_color_id, 10) });
    if (celebrity !== undefined) whereClause[Op.and].push({ celebrity: parseInt(celebrity, 10) });
    if (isUGC !== undefined) whereClause[Op.and].push({ isUGC: parseInt(isUGC, 10) });
    if (search) {
      whereClause[Op.or] = [
          { firstName: { [Op.like]: `%${search}%` } },  
          { lastName: { [Op.like]: `%${search}%` } },
          { displayName: { [Op.like]: `%${search}%` } }
      ];
    }

    console.log("Clausula SocialNetwork");
    console.dir(whereClause.socialNetwork, { depth: null }); // Mejor que JSON.stringify
    console.log("Clausula");
    console.dir(whereClause, { depth: null }); // Mejor que JSON.stringify
    console.log("🧐 Filtros aplicados antes de ");
    if (whereClause.length === 0 ) {
      return res.status(400).json({ message: "Debe proporcionar al menos un filtro" });
    }

    const influencers = await Influ.findAll({

      attributes: [
        'idUser', 'displayName', 'firstName','lastName','year','contact','emailAddress','phoneNumber','celebrity','isUGC',
        'socialInstagram', 'socialInstagramCla', 'socialInstagramSeg', 'socialTik', 'socialTikCla', 'socialTikSeg','socialFace', 
        'socialFaceCla', 'socialFaceSeg','socialUTube', 'socialUTubeCla', 'socialUTubeSeg', 'state_id', 'city_id', 'country_id',
        'gender_id', 'social_class_id', 'hair_type_id', 'hair_color_id', 'skin_color_id','costo_1', 'costo_2', 'costo_3', 'costo_4',
        'costo_5','costo_6','costo_7','costo_8','costo_9','costo_10','costo_11', 'costo_12'
      ],
      where: whereClause,
      include: [
        {
          model: InfluencerSubcategories,
          as: 'influencerSubcategories',
          include: [
            {
              model: SubCategory,
              as: 'subcategories',
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

    // Formatear la respuesta para incluir categorías y subcategorías correctamente
    const formattedInfluencers = influencers.map(influencer => {
      return {

        idUser: influencer.idUser,
        displayName: influencer.displayName,
        firstName: influencer.firstName,
        lastName: influencer.lastName,
        year: influencer.year,
        contact: influencer.contact,
        emailAddress: influencer.emailAddress,
        phoneNumber: influencer.phoneNumber,
        celebrity: influencer.celebrity,
        isUGC: influencer.isUGC,
        socialInstagram: influencer.socialInstagram,
        socialInstagramCla: influencer.socialInstagramCla,
        socialInstagramSeg: influencer.socialInstagramSeg,
        socialTik: influencer.socialTik,
        socialTikCla: influencer.socialTikCla,
        socialTikSeg: influencer.socialTikSeg,
        socialFace: influencer.socialFace,
        socialFaceCla: influencer.socialFaceCla,
        socialFaceSeg: influencer.socialFaceSeg,
        socialUTube: influencer.socialUTube,
        socialUTubeCla: influencer.socialUTubeCla,
        socialUTubeSeg: influencer.socialUTubeSeg,
        country_id: influencer.country_id,
        city_id: influencer.city_id,
        gender_id: influencer.gender_id,
        social_class_id: influencer.social_class_id,
        hair_type_id: influencer.hair_type_id,
        hair_color_id: influencer.hair_color_id,
        skin_color_id: influencer.skin_color_id,
        costo_1: influencer.costo_1,
        costo_2: influencer.costo_2,
        costo_3: influencer.costo_3,
        costo_4: influencer.costo_4,
        costo_5: influencer.costo_5,
        costo_6: influencer.costo_6,
        costo_7: influencer.costo_7,
        costo_8: influencer.costo_8,
        costo_9: influencer.costo_9,
        costo_10: influencer.costo_10,
        costo_11: influencer.costo_11,
        categories: influencer.influencerSubcategories.map(sub => ({
          category: sub.subcategory?.category?.category_name || "N/A",
          subcategory: sub.subcategory?.subcategory_name || "N/A",
          subcategory_id: sub.subcategory?.id || "N/A"
        }))
      };
    });

    //res.status(200).json(influencers);
    res.status(200).json(formattedInfluencers);
  } catch (error) {
    console.error("❌ Back - Error al obtener influencers:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
// Get total count of influencers
exports.getInfluencerCount = async (req, res) => {
  try {
    const count = await db.influ.count();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error("Error fetching influencer count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get influencer creations by recruiter and date range
exports.getInfluencersByRecruiterAndDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "startDate and endDate are required" });
    }

    console.log("📅 Fecha recibida en backend:", { startDate, endDate });

    const results = await db.sequelize.query(
      `SELECT u.id, u.username, COUNT(ic.id) as total
       FROM influencer_creations ic
       JOIN users u ON ic.user_id = u.id
       WHERE DATE(ic.created_at) BETWEEN ? AND ?
       GROUP BY u.id, u.username
       ORDER BY total DESC`,
      {
        replacements: [startDate, endDate],
        type: db.Sequelize.QueryTypes.SELECT
      }
    );

    console.log("📊 Resultados obtenidos:", results);

    if (!results || results.length === 0) {
      console.warn("⚠️ Consulta por reclutador devolvió vacío o inesperado:", results);
    }

    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error fetching influencer counts by recruiter:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};