const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
User.sync();
module.exports = { User };
