const db = require("../models");
const EthnicGroup = db.ethnic;

exports.getEthnicGroup = async (req, res) => {
  try {
    const ethnic = await EthnicGroup.findAll();
    res.status(200).json(ethnic);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving ethnic group",
      error: error.message,
    });
  }
};