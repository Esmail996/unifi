const service = require("./service");

module.exports = {
  //signup new user
  create: async (req, res) => {
    try {
      const { body } = req;
      const result = await service.create(body);
      res.status(201).send(result);
    } catch (err) {
      res.send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await service.login({ email, password });
      res.status(200).send(result);
    } catch (err) {
      res.send(err.message);
    }
  },
};
