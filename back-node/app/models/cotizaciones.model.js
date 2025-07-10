module.exports = (sequelize, Sequelize) => {
  const Cotizaciones = sequelize.define("Cotizacion", {
    idCotizacion: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    influencerId: {
      type: Sequelize.STRING,
      allowNull: true,
      get() {
        const value = this.getDataValue("influencerId");
        return value ? value.split(",") : [];
      },
      set(value) {
        this.setDataValue("influencerId", value ? value.join(",") : null);
      },
    },
    numCotizacion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numContacto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    personaContacto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailContacto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    whatsappContacto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("APPROVED", "PENDING", "CANCELED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dateCreated: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    tableName: "cotizaciones"
  });

  return Cotizaciones;
};
