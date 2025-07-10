const { UniqueConstraintError } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
  }, {
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

  return User;
};
