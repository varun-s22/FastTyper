const express = require("express");
const app = express();
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const { createConn } = require("./sqlz");
const authRoutes = require("./routes/auth");
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

app.use("/", authRoutes);
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
