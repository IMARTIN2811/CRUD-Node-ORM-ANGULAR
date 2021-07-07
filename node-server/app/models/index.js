const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./product.model.js")(sequelize,Sequelize);
db.user = require("./User.model.js")(sequelize,Sequelize);
db.role = require("./role.model.js")(sequelize,Sequelize);
db.img = require("./image.model.js")(sequelize,Sequelize);

//indica que el modelo de usuario puede pertenecer a muchos roles y viceversa.
db.role.belongsToMany(db.user, {
  //Con through, foreignKey, otherKey, vamos a tener una nueva tabla user_roles como conexión entre los usuarios y la tabla de roles a través de su clave principal como claves foráneas.
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

//Usamos User.belongsToMany(Role)para indicar que el modelo de usuario puede pertenecer a muchos roles y viceversa.
db.user.belongsToMany(db.role,{
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//Relacion de uno a muchos
/* 
db.user.hasMany(db.images,{ as: "ImagesUser"});
db.images.belongsTo(db.user, {
  foreignKey: "userId",
  as: "users",
});
*/

db.ROLES = ["user","admin", "employee"];

module.exports = db;
