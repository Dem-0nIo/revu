const SocialClass = require('./socialClass.model'); // Adjust the path as needed
const Gender = require('./gender.model');

module.exports = (sequelize, Sequelize) => {
  const Influencer = sequelize.define("influencers", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    idUser: {
      type: Sequelize.INTEGER,
      autoIncrement:true,
      allowNull: false,
      primaryKey: true,
    },
    birthdayDate: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.STRING,
    },
    gender_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Gender,
        key: 'id',
      },
      allowNull: false,
    },
    social_class_id: {
      type: Sequelize.INTEGER,
      references: {
          model: SocialClass,
          key: 'id',
      },
      allowNull: true,
    },
    hair_color_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hair_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    skin_color_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
	  contact: {
      type: Sequelize.STRING,
    },

    passport: {
      type: Sequelize.STRING,
    },
    displayName: {
      type: Sequelize.STRING,
    },
    emailAddress: {
      type: Sequelize.STRING,
    },
    addressLine: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    celebrity: {
      type: Sequelize.INTEGER,
    },
    city_id: {
      type: Sequelize.INTEGER,
    },
    state_id: {
      type: Sequelize.INTEGER,
    },
    country_id: {
      type: Sequelize.INTEGER,
    },
    emailNotification: {
      type: Sequelize.JSON,
    },
    pushNotification: {
      type: Sequelize.JSON,
    },
    phoneNumberWhp: {
      type: Sequelize.STRING,
    },
    socialInstagram: {
      type: Sequelize.STRING,
    },
    socialInstagramCla: {
      type: Sequelize.STRING,
    },
    socialInstagramSeg: {
      type: Sequelize.STRING,
    },
    socialTik: {
      type: Sequelize.STRING,
    },
    socialTikCla: {
      type: Sequelize.STRING,
    },
    socialTikSeg: {
      type: Sequelize.STRING,
    },
    socialFace: {
      type: Sequelize.STRING,
    },
    socialFaceCla: {
      type: Sequelize.STRING,
    },
    socialFaceSeg: {
      type: Sequelize.STRING,
    },
    socialUTube: {
      type: Sequelize.STRING,
    },
    socialUTubeCla: {
      type: Sequelize.STRING,
    },
    socialUTubeSeg: {
      type: Sequelize.STRING,
    },
    socialNetwork: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
      default: "/uploads/default.jpg",
    },
    costo_1: {
      type: Sequelize.INTEGER,
    },
    costo_2: {
      type: Sequelize.INTEGER,
    },
    costo_3: {
      type: Sequelize.INTEGER,
    },
    costo_4: {
      type: Sequelize.INTEGER,
    },
    costo_5: {
      type: Sequelize.INTEGER,
    },
    costo_6: {
      type: Sequelize.INTEGER,
    },
    costo_7: {
      type: Sequelize.INTEGER,
    },
    costo_8: {
      type: Sequelize.INTEGER,
    },
    costo_9: {
      type: Sequelize.INTEGER,
    },
    costo_10: {
      type: Sequelize.INTEGER,
    },
    costo_11: {
      type: Sequelize.INTEGER,
    },
    costo_12: {
      type: Sequelize.INTEGER,
    },
    costo_13: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'influencers',
  });

  Influencer.associate = (models) => {
    Influencer.hasMany(models.InfluencerSubcategories, {
        foreignKey: 'influencerId',
        as: 'influencerSubcategories',
    });
    Influencer.belongsToMany(models.SubCategory, {
      through: models.InfluencerSubcategories,
      foreignKey: "influencerId",
    });
    Influencer.belongsTo(models.SocialClass, { 
      foreignKey: 'social_class_id', as: 'socialClass' 
    });

  };

  return Influencer;
};
