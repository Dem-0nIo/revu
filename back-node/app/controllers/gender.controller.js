const { json } = require("sequelize");
const db = require("../models");
console.log(db.gender);
const Gender = db.gender;


exports.getAllGenders = async (req, res) => {
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