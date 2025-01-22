const { Country } = require('../models'); // Asegúrate de ajustar la ruta según tu estructura de archivos

// Obtener todos los países
exports.getAllCountries = async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.status(200).json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ message: 'Error fetching countries', error });
  }
};

// Obtener un país por ID
exports.getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error('Error fetching country by ID:', error);
    res.status(500).json({ message: 'Error fetching country', error });
  }
};

// Crear un nuevo país
exports.createCountry = async (req, res) => {
  try {
    const { name, name_en, iso_code, iso_code_2, region, is_active } = req.body;
    const newCountry = await Country.create({
      name,
      name_en,
      iso_code,
      iso_code_2,
      region,
      is_active,
    });

    res.status(201).json(newCountry);
  } catch (error) {
    console.error('Error creating country:', error);
    res.status(500).json({ message: 'Error creating country', error });
  }
};

// Actualizar un país por ID
exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, name_en, iso_code, iso_code_2, region, is_active } = req.body;

    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    await country.update({
      name,
      name_en,
      iso_code,
      iso_code_2,
      region,
      is_active,
    });

    res.status(200).json(country);
  } catch (error) {
    console.error('Error updating country:', error);
    res.status(500).json({ message: 'Error updating country', error });
  }
};

// Eliminar un país por ID
exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await Country.findByPk(id);

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    await country.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting country:', error);
    res.status(500).json({ message: 'Error deleting country', error });
  }
};