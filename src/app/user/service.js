const { compare, hash } = require("bcrypt");
const { sign } = require("jsonwebtoken");
//const sequelize = require("../../db");
//const db = sequelize.models;
const User = require("../../db/models/user-mongo");

module.exports = {
  // create user
  create: async (body) => {
    const password = await hash(body.password, 10);
    // let user = await db.User.create({
    //   name: body.name,
    //   email: body.email,
    //   password: password,
    //   address: body.address,
    // });
    const user = new User({
      name: body.name,
      email: body.email,
      address: body.address,
      password: password,
    });
    const savedUser = await user.save();
    return savedUser;
  },
  // login user
  login: async ({ email, password }) => {
    const password = await hash(password, 10);
    //let user = await db.User.findOne({ where: { email: email } });
    let user = User.findOne({ email: email, password: password });
    if (!user) return "Unauthorized";
    //user = user.get({ plain: true });
    console.log(user);
    const token = sign({ user }, "secret", { expiresIn: "60m" });
    return { token };
  },
};
