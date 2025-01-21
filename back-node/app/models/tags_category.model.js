module.exports = (sequelize, DataTypes) => {
    const TagsCategory = sequelize.define('TagsCategory', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });
  
    TagsCategory.associate = (models) => {
      TagsCategory.hasMany(models.SubCategory, {
        foreignKey: 'tag_category_id',
        as: 'subcategories',
      });
    };
  
    return TagsCategory;
  };