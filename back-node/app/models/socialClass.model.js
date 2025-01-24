module.exports = (sequelize, Sequelize) => {
    const SocialClass = sequelize.define("SocialClass", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        class_name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
    }, {
        tableName: 'social_classes',
        timestamps: false,
    });
    return SocialClass;
};