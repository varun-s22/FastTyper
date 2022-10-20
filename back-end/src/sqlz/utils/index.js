const { sequelize } = require("../index");
const { QueryTypes } = require("sequelize");
const { User } = require("../models/user");

const verify = async (issuer, profile, cb) => {
  let userID = profile.id;
  let name = profile.displayName;
  let email = profile.emails[0].value;
  try {
    let users = await sequelize.query(
      `SELECT * FROM "Users" WHERE "userID"= :id`,
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
module.exports = verify;
