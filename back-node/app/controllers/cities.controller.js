const { json } = require("sequelize");
const db = require("../models");
const City = db.cities;

exports.getAllCities = async (req, res) => {
    // Find all genders
    try {
        const { sortBy = "city_name", order = "ASC" } = req.query; // Get sort parameters from query string
        const cities = await City.findAll({
          order: [[sortBy, order.toUpperCase()]], // Sort by column and direction
        });
        res.status(200).json(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        res.status(500).json({ message: "Failed to fetch cities." });
      }
  };