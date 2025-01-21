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
        references: {
          model: 'TagsCategory',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  
    SubCategory.associate = (models) => {
      SubCategory.belongsTo(models.TagsCategory, {
        foreignKey: 'tag_category_id',
        as: 'category',
      });
    };
  
    return SubCategory;
  };