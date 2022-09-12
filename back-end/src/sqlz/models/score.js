const { DataTypes, Deferrable } = require("sequelize");
const { sequelize } = require("../index");
const { User } = require("../models/user");

const Score = sequelize.define("Score", {
  id: {
    type: DataTypes.STRING,
    references: {
      model: User,
      key: "userID",
      deferrable: Deferrable.INITIALLY_IMMEDIATE,
    },
    primaryKey: true,
  },
  wpm: {
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    primaryKey: true,
  },
});
Score.sync();
module.exports = { Score };
