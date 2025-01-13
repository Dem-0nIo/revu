const { json } = require("sequelize");
const db = require("../models");
const Department = db.departments;

exports.getAllDepartments = async (req, res) => {
    // Find all genders
    try {
        const { sortBy = "department_name", order = "ASC" } = req.query; // Get sort parameters from query string
        const departments = await Department.findAll({
          order: [[sortBy, order.toUpperCase()]], // Sort by column and direction
        });
        res.status(200).json(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
        res.status(500).json({ message: "Failed to fetch departments." });
      }
  };