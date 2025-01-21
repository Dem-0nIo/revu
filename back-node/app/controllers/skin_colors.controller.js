const db = require("../models");
const SkinColor = db.skin_colors;

exports.getSkinColors = async (req, res) => {
  try {
    const skin = await SkinColor.findAll();
    res.status(200).json(skin);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving skin",
      error: error.message,
    });
  }
};