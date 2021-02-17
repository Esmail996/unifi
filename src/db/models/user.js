const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Todo, { foreignKey: { name: "userId" } });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING(40), allowNull: false },
      email: { type: DataTypes.STRING, unique: "user_email" },
      password: { type: DataTypes.TEXT, allowNull: false },
      address: { type: DataTypes.TEXT },
    },
    {
      sequelize,
      underscored: true,
      timestamps: false,
    }
  );
  return User;
};
