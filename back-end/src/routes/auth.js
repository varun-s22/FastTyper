const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login/federated/google", passport.authenticate("google"));
router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.WEBSITE}`);
  }
);
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect(`${process.env.WEBSITE}`);
  });
});
router.get("/user", (req, res) => {
  console.log(req.user);
  res.send(req.user ?? {});
});
module.exports = router;
