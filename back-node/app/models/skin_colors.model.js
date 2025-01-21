module.exports = (sequelize, Sequelize) => {
    const SkinColor = sequelize.define("skin_colors", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        skin_color_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
            unique: true,
        },
    },
    {
      timestamps: false, // Opcional: Si no necesitas createdAt y updatedAt
    });
    return SkinColor;
};