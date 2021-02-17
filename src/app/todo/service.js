const sequelize = require("../../db");
const db = sequelize.models;

module.exports = {
  // create post
  // to got the userId from the query is a bad practice we should get it from JWT or cookie but this is just for speed up a little :)
  create: async (body, userId) => {
    const query = {
      title: body.title,
      description: body.description,
    };
    query.userId = userId;
    const todo = await db.Todo.create(query);

    return { id: todo.id };
  },

  // update
  update: async (id, body, userId) => {
    const todo = await db.Todo.update(body, {
      where: { id, userId },
    });
    return { id: id };
  },

  //delete
  delete: async (id, userId) => {
    await sequelize.transaction(async (transaction) => {
      const [rows] = await Promise.all([
        //delete
        db.Todo.destroy({ where: { id }, transaction }),
        //check permission to category
        db.Todo.checkUser(id, userId),
      ]);
    });
  },

  //get specific todo item for user
  getById: async (id, userId) => {
    const todo = await db.Todo.findOne({ where: { id, userId } });
    if (!todo) return "not found";
    return todo;
  },

  //get all to do list for some user
  getAll: async (query) => {
    const { count, rows } = await db.Todo.findAndCountAll({
      where: { userId: Number(query.userId) },
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    return { totalCount: count, data: rows };
  },
};
