const sequelize = require("../../db");
const db = sequelize.models;

module.exports = {
  // create post
  // to got the user id from the query practice we should get it from JWT or cookie but this is just for speed up a little :)
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
      await Promise.all([
        //check permission to category
        db.Todo.checkUser(id, userId),
        //delete
        db.Todo.destroy({ where: { id }, transaction }),
      ]);
    });
  },

  getAll: async (query) => {
    const { count, rows } = await db.Todo.findAndCountAll({
      where: { userId: Number(query.userId) },
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    return { totalCount: count, data: rows };
  },
};
