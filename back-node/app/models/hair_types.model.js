module.exports = (sequelize, Sequelize) => {
    const HairType = sequelize.define("hair_types", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hair_type_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    });
    return HairType;
};