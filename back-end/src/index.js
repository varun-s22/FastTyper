const express = require("express");
const app = express();
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const { createConn } = require("./sqlz");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/rooms");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Score } = require("./sqlz/models/score");
const { connectUsers } = require("./socket");

require("dotenv").config();
const port = process.env.PORT;
const httpServer = createServer(app);
const website = process.env.WEBSITE;
console.log(website);
const io = new Server(httpServer, {
  path: "/room",
  cors: {
    origin: `${website}`,
    credentials: true,
  },
});
const sessionObj = session({
  secret: process.env.SESSION_SECRET,
});

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${website}`);
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

createConn();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(sessionObj);
app.use(passport.initialize());
app.use(passport.session());

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionObj));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket, next) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error("Un-authorized"));
  }
});

app.use("/", authRoutes);
app.use("/", roomRoutes);
connectUsers(io);
httpServer.listen(port, () => {
  console.log(`Connected to port ${port}`);
});
module.exports = { io };
