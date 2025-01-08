const { json } = require("sequelize");
const db = require("../models");
console.log("*******Consulta bd genders***********"); 
console.log(db.gender);
console.log("*******Consulta bd genders***********");  
const Gender = db.gender;

// Fetch all genders
/*const getAllGenders = async (req, res) => {
  try {
    const genders = await Gender.findAll();
    res.status(200).json(genders);
  } catch (error) {
    console.error("Error fetching genders:", error);
    res.status(500).json({ message: "Failed to fetch genders." });
  }
};

module.exports = {
  getAllGenders,
};*/

exports.getAllGenders = async (req, res) => {
    const { sortBy = "id", order = "ASC" } = req.query; // Get sort parameters from query string
    // Find all genders
    try {
        const { sortBy = "id", order = "ASC" } = req.query; // Get sort parameters from query string
        const genders = await Gender.findAll({
          order: [[sortBy, order.toUpperCase()]], // Sort by column and direction
        });
        res.status(200).json(genders);
      } catch (error) {
        console.error("Error fetching genders:", error);
        res.status(500).json({ message: "Failed to fetch genders." });
      }
  };