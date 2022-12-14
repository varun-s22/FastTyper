const express = require("express");
const { getUsersOfRoom } = require("../socket");
const {
  createRoom,
  getText,
  publishScore,
  getScoresOfUsers,
} = require("../sqlz/utils");
const router = express.Router();

router.get("/createRoom", async (req, res) => {
  try {
    let newRoom = await createRoom();
    res.status(200).send(newRoom);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.get("/joinRoom", async (req, res) => {
  let roomID = req.query.roomID;
  try {
    let text = await getText(roomID);
    res.status(200).send(text);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.post("/score", async (req, res) => {
  let { id, wpm, date } = req.body;
  try {
    let newScore = await publishScore(id, wpm, date);
    res.status(200).send(newScore);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.get("/users", async (req, res) => {
  let { roomID } = req.query;
  try {
    let users = await getUsersOfRoom(req.io, roomID);
    res.status(200).send({ users });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.get("/scores", async (req, res) => {
  let { id } = req.query;
  try {
    let scores = await getScoresOfUsers(id);
    res.status(200).send({ scores });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
module.exports = router;
