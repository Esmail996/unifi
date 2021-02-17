const service = require("./service");

module.exports = {
  //MM-8
  create: async (req, res) => {
    try {
      const { body } = req;
      const result = await service.create(body);
      res.status(201).send(result);
    } catch (err) {
      res.send(err.message);
    }
  },
};
