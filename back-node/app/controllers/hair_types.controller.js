const db = require("../models");
const HairTypes = db.hair_types ;

exports.getHairTypes = async (req, res) => {
  try {
    const hair = await HairTypes.findAll();
    res.status(200).json(hair);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving hair",
      error: error.message,
    });
  }
};