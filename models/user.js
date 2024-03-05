const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
const bcrypt = require("bcrypt");

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;
