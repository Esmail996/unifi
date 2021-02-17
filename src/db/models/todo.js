const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Todo extends Model {
    static STATUS = ["done", "available"];

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { name: "userId", allowNull: false },
        onDelete: "CASCADE",
      });
    }

    static async checkUser(id, userId) {
      const todo = await this.findOne({
        attributes: ["id"],
        where: { id, userId },
      });
      if (!todo) return "Not Found";
    }
  }

  Todo.init(
    {
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.ENUM(Todo.STATUS), defaultValue: "available" },
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
    }
  );

  return Todo;
};
