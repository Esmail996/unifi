const sequelize = require("../../db");
const db = sequelize.models;
const Todo = require("../../db/models/todo-mongo");

module.exports = {
  // create post
  create: async (body, user) => {
    const todo = {
      title: body.title,
      description: body.description,
      userId: user.id,
    };
    const savedTodo = await Todo.save();
    // const todo = await db.Todo.create(query);
    return savedTodo;
  },

  // update
  update: async (id, body, user) => {
    // const todo = await db.Todo.update(body, {
    //   where: { id, userId: user.id },
    // });
    // return { id: id };
    const todo = Todo.updateOne({ _id: id, userId: user }, { body });
  },

  //delete
  delete: async (id, user) => {
    return await sequelize.transaction(async (transaction) => {
      const [rows] = await Promise.all([
        //delete
        db.Todo.destroy({ where: { id }, transaction }),
        //check permission to category
        db.Todo.checkUser(id, user.id),
      ]);
      return { rows };
    });
  },

  //get specific todo item for user
  getById: async (id, user) => {
    const todo = await db.Todo.findOne({ where: { id, userId: user.id } });
    if (!todo) return "not found";
    return todo;
  },

  //get all to do list for some user
  getAll: async (user, query) => {
    const { count, rows } = await db.Todo.findAndCountAll({
      where: { userId: user.id },
      offset: Number(query.offset),
      limit: Number(query.limit),
    });
    return { totalCount: count, data: rows };
  },
};
