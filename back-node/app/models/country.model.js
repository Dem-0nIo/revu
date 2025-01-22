module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define('Country', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: 'Nombre del país en español',
    },
    name_en: {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: 'Nombre del país en inglés',
    },
    iso_code: {
      type: Sequelize.CHAR(3),
      allowNull: false,
      unique: true,
      comment: 'Código ISO Alpha-3',
    },
    iso_code_2: {
      type: Sequelize.CHAR(2),
      allowNull: false,
      unique: true,
      comment: 'Código ISO Alpha-2',
    },
    region: {
      type: Sequelize.STRING(100),
      allowNull: true,
      comment: 'Región a la que pertenece el país (ej. América, Europa)',
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      comment: 'Estado del país (true = habilitado, false = deshabilitado)',
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      comment: 'Fecha de creación',
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      onUpdate: Sequelize.NOW,
      comment: 'Fecha de última actualización',
    },
  }, {
    tableName: 'countries', // Nombre exacto de la tabla en la base de datos
    timestamps: false, // Evita que Sequelize genere automáticamente los campos createdAt y updatedAt
  });

  return Country;
};