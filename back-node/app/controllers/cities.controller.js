const { json } = require("sequelize");
const db = require("../models");
const City = db.cities;

exports.getAllCities = async (req, res) => {
    // Find all cities
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

exports.getCitiesWithDepartmentsForColombia = async(req, res) => {
  console.log('Entró al endpoint de Colombia'); 
  try {
      const { sortBy = "city_name", order = "ASC"}  = req.query;
      const cities = await City.findAll ({
        where: { country_id: 5}, //Colombia id
        include: [
          {
            model: db.departments,
            as: 'department',
            attributes: ['id', 'department_name']
          }
        ],
        attributes: ['id', 'city_name']
      });

      const result = cities.map(city => ({
        id: city.id,
        name: `${city.city_name} - ${city.department?.department_name ?? ''}`
      }));

      res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching Colombian cities'});
  }
};