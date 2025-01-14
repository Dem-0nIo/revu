module.exports = (sequelize, Sequelize) => {
    const EthnicGroup = sequelize.define("ethnic_groups", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ethnicity_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    });
  
    return EthnicGroup;
  };