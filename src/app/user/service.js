const { hash } = require("bcrypt");
const sequelize = require("../../db");
const db = sequelize.models;

module.exports = {
  // create user
  create: async (body) => {
    let password = body.password;
    password = await hash(body.password, 10);
    let user = await db.User.create({
      name: body.name,
      email: body.email,
      password: password,
      address: body.address,
    });
    return {
      id: user.id,
      name: user.name,
    };
  },
};
