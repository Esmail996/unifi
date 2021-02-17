"use strict";
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("mysql://root:password@localhost/unifiDB", {
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .map((file) => require(path.join(__dirname, file))(sequelize))
  .map((model) => model.associate(sequelize.models));

module.exports = sequelize;
