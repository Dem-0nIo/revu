const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  pool: config.development.pool,
  timezone: config.development.timezone,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized successfully.");
});

db.influ = require("../models/influencer.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.cotizaciones = require("../models/cotizaciones.model.js")(sequelize, Sequelize);
db.roles = require("../models/user_roles.model.js")(sequelize, Sequelize);
db.gender = require("../models/gender.model.js")(sequelize, Sequelize);
db.cities = require("../models/cities.model.js")(sequelize, Sequelize);
db.departments = require("../models/departments.model.js")(sequelize, Sequelize);
db.influencer_classes = require("../models/influencer_classes.model.js")(sequelize, Sequelize);
db.ethnic = require("../models/ethnic.model.js")(sequelize, Sequelize);
db.hair_types = require("../models/hair_types.model.js")(sequelize, Sequelize);
db.hair_colors = require("../models/hair_colors.model.js")(sequelize, Sequelize);
db.skin_colors = require("../models/skin_colors.model.js")(sequelize, Sequelize);
db.TagsCategory = require("../models/tags_category.model.js")(sequelize, Sequelize);
db.SubCategory = require("../models/sub_category.model.js")(sequelize, Sequelize);
db.Country = require("../models/country.model.js")(sequelize, Sequelize);
db.InfluencerSubcategories = require("../models/influencerSubcategories.model.js")(sequelize, Sequelize);
db.SocialClass = require("../models/socialClass.model.js")(sequelize, Sequelize);


// ✅ Check if models are correctly imported
console.log("Loaded models:", Object.keys(db));

// Call associations after model initialization
db.SubCategory.belongsTo(db.TagsCategory, {
  foreignKey: 'tag_category_id',
  as: 'category', // Ensure alias matches model definition
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});
db.influ.belongsTo(db.SocialClass, { 
    foreignKey: 'social_class_id', 
    as: 'socialClass' 
});
db.influ.hasMany(db.InfluencerSubcategories, {
  foreignKey: "influencerId",
  as: "influencerSubcategories",
});
db.InfluencerSubcategories.belongsTo(db.SubCategory, {
  foreignKey: "subcategoryId",
  as: "subcategory",
});

if (db.cities.associate) db.cities.associate(db);
if (db.departments.associate) db.departments.associate(db);


db.ROLES = ["admin", "cct", "reclutador"];

module.exports = db;
