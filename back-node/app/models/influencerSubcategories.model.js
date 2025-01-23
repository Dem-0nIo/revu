module.exports = (sequelize, Sequelize) => {
    const InfluencerSubcategories = sequelize.define(
        'InfluencerSubcategories',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            influencerId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Influencer', // Ensure the model is correctly named
                    key: 'id',
                },
            },
            subcategoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'SubCategory', // Ensure the model is correctly named
                    key: 'id',
                },
            },
        },
        {
            tableName: 'InfluencerSubcategories', // Match the table name
            timestamps: false, // Avoid unnecessary timestamps
        }
    );

    InfluencerSubcategories.associate = (models) => {
        InfluencerSubcategories.belongsTo(models.Influencer, {
            foreignKey: 'influencerId',
            as: 'influencer',
        });
        InfluencerSubcategories.belongsTo(models.SubCategory, {
            foreignKey: 'subcategoryId',
            as: 'subcategory',
        });
    };

    return InfluencerSubcategories;
};