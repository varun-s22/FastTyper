const { DataTypes } = require("sequelize");
const { sequelize } = require("../index");

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
Room.sync();
module.exports = { Room };
