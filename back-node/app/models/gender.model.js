module.exports = (sequelize, Sequelize) => {
    const Gender = sequelize.define("gender", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, // Disable `createdAt` and `updatedAt`
    });
    return Gender;
  };