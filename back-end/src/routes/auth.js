const express = require("express");
const router = express.Router();
const passport = require("passport");
const verify = require("../sqlz/utils/index");
const GoogleStategy = require("passport-google-oidc");

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

router.get("/login/federated/google", passport.authenticate("google"));
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/login/federated/google",
  }),
  (req, res) => {
    res.redirect(`${process.env.WEBSITE}`);
  }
);
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).send({ msg: "Logged out" });
  });
});
router.get("/user", (req, res) => {
  res.send(req.user ?? {});
});

router.get("/authenticated", (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      isLoggedIn: false,
      msg: "Not Logged In",
    });
  }
  res.status(200).send({
    isLoggedIn: true,
    msg: "logged in ",
  });
});
module.exports = router;
