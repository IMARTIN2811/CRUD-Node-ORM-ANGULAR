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

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize,Sequelize);
db.users = require("./User.model.js")(sequelize,Sequelize);
db.role = require("./role.model.js")(sequelize,Sequelize);

//indica que el modelo de usuario puede pertenecer a muchos roles y viceversa.
db.role.belongsToMany(db.users, {
  //Con through, foreignKey, otherKey, vamos a tener una nueva tabla user_roles como conexión entre los usuarios y la tabla de roles a través de su clave principal como claves foráneas.
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

//Usamos User.belongsToMany(Role)para indicar que el modelo de usuario puede pertenecer a muchos roles y viceversa.
db.users.belongsToMany(db.role,{
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user","admin", "employee"];

module.exports = db;
