const express = require("express");
const sequelize = require("./db");

const start = async () => {
  // Db connection
  await sequelize.authenticate();
  //await sequelize.sync({ sync: true, force: true });
  const router = require("./app/router");

  ///
  const app = express();

  app.use(express.static(__dirname + "/public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(router);

  // Server Connection
  app.listen(3000, (req, res) => {
    console.log("App is listening on port 3000");
  });
};
start().catch((err) => console.log(`db error ${err.message}`));
