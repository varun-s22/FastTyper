const { sequelize } = require("../index");
const { QueryTypes } = require("sequelize");
const { User } = require("../models/user");
const { Room } = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { Score } = require("../models/score");

const verify = async (issuer, profile, cb) => {
  let userID = profile.id;
  let name = profile.displayName;
  let email = profile.emails[0].value;
  try {
    let users = await sequelize.query(
      `SELECT * FROM "User" WHERE "userID"= :id`,
      {
        replacements: {
          id: userID,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (users.length === 0) {
      // no user registered with this key
      let newUser = await User.create({
        userID,
        name,
        email,
      });
      console.log(`logged in as ${newUser}`);
      return cb(null, newUser);
    }
    return cb(null, users[0]);
  } catch (err) {
    return cb(err);
  }
};

const generateText = async (minLength = 300) => {
  let params = { minLength };
  try {
    let res = await axios.get("https://api.quotable.io/random", { params });
    return res.data.content;
  } catch (e) {
    console.log(e);
    throw new Error("Error while fetching text");
  }
};

const createRoom = async () => {
  // creates a new room
  let roomID = uuidv4();
  try {
    let textToType = await generateText();
    let newRoom = await Room.create({
      id: roomID,
      text: textToType,
    });
    console.log(`New room created at ${newRoom.id}`);
    return newRoom;
  } catch (e) {
    console.log(e);
    throw new Error("Error while creating room");
  }
};

const getText = async (roomID) => {
  try {
    let room = await sequelize.query(
      `SELECT text FROM "Room" WHERE "id"= :roomID`,
      {
        replacements: {
          roomID,
        },
        type: QueryTypes.SELECT,
      }
    );
    if (!room) {
      // no such room exists
      return {};
    }
    return room[0];
  } catch (e) {
    console.log(e);
    throw new Error("Error while fetching text");
  }
};
const publishScore = async (id, wpm, date) => {
  try {
    let newScore = await Score.create({
      id,
      wpm,
      date,
    });
    console.log(`Score of ${wpm} added for user ${id}, dated: ${date}`);
    return newScore;
  } catch (e) {
    console.log(e);
    throw new Error("Error while pushing score");
  }
};
const getScoresOfUsers = async (id) => {
  try {
    let scores = await sequelize.query(
      `SELECT wpm,date FROM "Score" WHERE "id"=:id`,
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );
    return scores;
  } catch (e) {
    console.log(e);
    throw new Error("Error while getting scores");
  }
};
module.exports = {
  verify,
  createRoom,
  getText,
  publishScore,
  getScoresOfUsers,
};
