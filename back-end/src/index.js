const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStategy = require("passport-google-oidc");
const path = require("path");
const session = require("express-session");
const { createConn } = require("./sqlz");
const { User } = require("./sqlz/models/user");
const { Score } = require("./sqlz/models/score");

require("dotenv").config();
const port = process.env.PORT;

createConn();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "html");
const verify = async (issuer, profile, cb) => {
  console.log("logged in");
  const jane = User.build({
    name: "Jane",
    userID: "12",
    email: "helo@world.com",
  });
  const scores = Score.build({
    id: "12",
    wpm: 12,
    date: new Date(),
  });
  console.log(jane instanceof User); // true
  console.log(jane);
  console.log(scores);
  console.log({ profile, issuer });
  console.log(profile.emails);
};
app.use(
  session({
    secret: "thisbetterbeagoodsecret",
  })
);
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
app.get("/", (req, res) => {
  res.render("index.html");
});
app.get("/login/federated/google", passport.authenticate("google"));
app.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
  })
);
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
