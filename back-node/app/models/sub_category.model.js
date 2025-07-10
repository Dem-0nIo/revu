module.exports = (sequelize, DataTypes) => {
    const SubCategory = sequelize.define('SubCategory', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tag_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
      tableName: "SubCategories", // Match the database table name
    });
  
    SubCategory.associate = (models) => {
      SubCategory.belongsTo(models.TagsCategory, {
        foreignKey: 'tag_category_id',
        as: 'category',
      });
      SubCategory.belongsToMany(models.Influencer , { 
        through: models.InfluencerSubcategories, 
        foreignKey: 'subcategoryId', 
      });
      SubCategory.hasMany(models.InfluencerSubcategories, {
        foreignKey: 'subcategoryId',
        as: 'influencerSubcategories',
      });
    };
  
    return SubCategory;
  };