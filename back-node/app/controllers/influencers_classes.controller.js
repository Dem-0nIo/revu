const db = require("../models");
const InfluencerClass = db.influencer_classes;

exports.getInfluencerClasses = async (req, res) => {
  try {
    const classes = await InfluencerClass.findAll();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving influencer classes",
      error: error.message,
    });
  }
};