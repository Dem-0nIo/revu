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
  },
  {
    timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    tableName: "TagsCategories", // Match the database table name
  });


  TagsCategory.associate = (models) => {
    TagsCategory.hasMany(models.SubCategory, {
      foreignKey: 'tag_category_id',
      as: 'subcategories',
    });

    // Relación inversa necesaria para evitar errores en eager loading
    models.SubCategory.belongsTo(TagsCategory, {
      foreignKey: 'tag_category_id',
      as: 'category',
    });
  };

  return TagsCategory;
};