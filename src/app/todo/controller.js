const service = require("./service");

module.exports = {
  //MM-8
  create: async (req, res) => {
    try {
      const { body } = req;
      const { userId } = req.query;
      const result = await service.create(body, userId);
      res.status(201).send(result);
    } catch (err) {
      res.send(err.message);
    }
  },

  //update
  update: async (req, res) => {
    try {
      const { body } = req;
      const { userId } = req.query;
      const { id } = req.params;
      const result = await service.update(id, body, userId);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },

  //delete
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      const result = await service.delete(id, userId);
      res.status(204).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },
  // get All todo list
  getAll: async (req, res) => {
    try {
      const { query } = req;
      const userId = query.userId;
      const offset = query.offset || 0;
      const limit = query.limit || 50;
      const result = await service.getAll(query);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },
};
