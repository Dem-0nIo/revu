module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "departments",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      department_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    }
  );

  Department.associate = (models) => {
    Department.hasMany(models.cities, {
      foreignKey: 'department_id',
      as: 'cities'
    });
  };

  return Department;
};