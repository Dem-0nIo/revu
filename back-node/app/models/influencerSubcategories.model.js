module.exports = (sequelize, DataTypes) => {
  const InfluencerSubcategories = sequelize.define("InfluencerSubcategories", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    influencerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: "InfluencerSubcategories",
    timestamps: false,
  });

  return InfluencerSubcategories;
};

