module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define(
      "city", // Nombre del modelo en singular
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        city_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        country_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'countries',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        department_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'departments',
            key: 'id'
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        },
      },
      {
        tableName: 'cities',
        timestamps: false, // Desactivar `createdAt` y `updatedAt`
      }
    );

    City.associate = (models) => {
      City.belongsTo(models.Country, {
          foreignKey: 'country_id',
          as: 'country'
      });
      City.belongsTo(models.departments, {
        foreignKey: 'department_id',
        as: 'department',
        constraints: false
      });
    };

    City.sync = async () => {
      return Promise.resolve(); // Evita sync real
    };

    return City;
  };