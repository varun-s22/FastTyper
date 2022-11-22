const express = require("express");
const { getUsersOfRoom } = require("../socket");
const { createRoom, getText, publishScore } = require("../sqlz/utils");
const router = express.Router();

router.get("/createRoom", async (req, res) => {
  let newRoom = await createRoom();
  res.status(200).send(newRoom);
});
router.get("/joinRoom", async (req, res) => {
  let roomID = req.query.roomID;
  let text = await getText(roomID);
  res.status(200).send(text);
});
router.post("/score", async (req, res) => {
  let { id, wpm, date } = req.body;
  let newScore = await publishScore(id, wpm, date);
  res.status(200).send(newScore);
});
router.get("/users", async (req, res) => {
  let { roomID } = req.query;
  let users = await getUsersOfRoom(req.io, roomID);
  res.status(200).send({ users });
});
module.exports = router;
