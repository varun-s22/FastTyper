const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStategy = require("passport-google-oidc");
const path = require("path");
const session = require("express-session");
const { createConn } = require("./sqlz");
const authRoutes = require("./routes/auth");
const verify = require("./sqlz/utils/index");
const cors = require("cors");
const { Score } = require("./sqlz/models/score");

require("dotenv").config();
const port = process.env.PORT;
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

createConn();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
console.log(process.env.WEBSITE);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.userID, username: user.email, name: user.name });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
passport.use(
  new GoogleStategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile", "email"],
    },
    verify
  )
);

app.use("/", authRoutes);
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
