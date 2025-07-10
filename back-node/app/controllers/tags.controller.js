const db = require('../models');
const TagsCategory = db.TagsCategory;
const SubCategory = db.SubCategory;

// Obtener categorías con sus subcategorías
exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await TagsCategory.findAll({
      include: [
            {
                model: SubCategory,
                as: 'subcategories',
                attributes: ['id', 'subcategory_name'],
            },
        ],  
    });
    //console.log(JSON.stringify(categories, null, 2));
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const category = await TagsCategory.findAll();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving all categories",
      error: error.message,
    });
  }
};

exports.getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params; // Use URL params for clarity
    console.log('Received ID:', id); 
    const subcategories = await SubCategory.findAll({
      where: {
        tag_category_id: id,
      },
      attributes: ['id', 'subcategory_name'], // Fetch only required fields
    });

    if (!subcategories.length) {
      return res.status(404).json({ message: 'No subcategories found for this category ID' });
    }

    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories by category ID:', error);
    res.status(500).json({ message: 'Error fetching subcategories', error });
  }
};

// Crear una nueva categoría
exports.createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const newCategory = await TagsCategory.create({ category_name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error al crear categoría' });
  }
};

// Crear una nueva subcategoría
exports.createSubcategory = async (req, res) => {
  try {
    const { subcategory_name, tag_category_id } = req.body;
    const newSubcategory = await SubCategory.create({
      subcategory_name,
      tag_category_id,
    });
    res.status(201).json(newSubcategory);
  } catch (error) {
    console.error('Error al crear subcategoría:', error);
    res.status(500).json({ message: 'Error al crear subcategoría' });
  }
};