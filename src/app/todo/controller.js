const service = require("./service");

module.exports = {
  create: async (req, res) => {
    try {
      const { body, user } = req;
      const result = await service.create(body, user);
      res.status(201).send(result);
    } catch (err) {
      res.send(err.message);
    }
  },

  //update
  update: async (req, res) => {
    try {
      const { body, user } = req;
      const { id } = req.params;
      const result = await service.update(id, body, user);
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
      const { user } = req;
      const result = await service.delete(id, user);
      res.status(204).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },
  //get todo by id
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const { user } = req;
      const result = await service.getById(id, user);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },
  // get All todo list
  getAll: async (req, res) => {
    try {
      const { query, user } = req;
      const offset = query.offset || 0;
      const limit = query.limit || 50;
      const result = await service.getAll(user, query);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    }
  },
};
