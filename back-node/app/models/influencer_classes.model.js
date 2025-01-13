module.exports = (sequelize, Sequelize) => {
    const InfluencerClass = sequelize.define(
      "influencer_classes",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        class_name: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: true,
        },
        min_followers: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        max_followers: {
          type: Sequelize.INTEGER,
          allowNull: true, // Puede ser NULL para clasificaciones sin límite superior
        },
      },
      {
        timestamps: false, // No necesitas createdAt ni updatedAt para esta tabla
      }
    );
  
    return InfluencerClass;
  };