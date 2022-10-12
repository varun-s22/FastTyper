const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const User = sequelize.define("User", {
  userID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync();
module.exports = { User };
