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
                as: 'sub_category',
                attributes: ['id', 'subcategory_name'],
            },
        ],  
    });
    console.log(JSON.stringify(categories, null, 2));
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
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