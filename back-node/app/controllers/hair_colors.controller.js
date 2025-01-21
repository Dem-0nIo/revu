const db = require("../models");
const HairColor = db.hair_colors;

exports.getHairColor = async (req, res) => {
  try {
    const hair = await HairColor.findAll();
    res.status(200).json(hair);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving hair",
      error: error.message,
    });
  }
};