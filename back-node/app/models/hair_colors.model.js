module.exports = (sequelize, Sequelize) => {
    const HairColor = sequelize.define("hair_colors", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        hair_color_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    });
    return HairColor;
};