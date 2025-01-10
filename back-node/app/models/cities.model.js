module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define(
      "city", // Nombre del modelo en singular
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        city_name: {
          type: Sequelize.STRING(100), // Coincide con VARCHAR(100)
          allowNull: false,
        },
        department_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "departments", // Nombre de la tabla referenciada
            key: "id", // Clave foránea
          },
          onDelete: "CASCADE", // Acción al eliminar
          onUpdate: "CASCADE", // Acción al actualizar
        },
      },
      {
        timestamps: false, // Desactivar `createdAt` y `updatedAt`
      }
    );
    return City;
  };