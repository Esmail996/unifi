const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
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
  // login user
  login: async ({ email, password }) => {
    let user = await db.User.findOne({ where: { email: email } });
    if (!user) res.status(401);
    user = user.get({ plain: true });
    if (!(await compare(password, user.password))) return "Unauthorized";
    const token = sign({ user }, "secret", { expiresIn: "60m" });
    return { token };
  },
};
