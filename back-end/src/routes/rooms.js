const express = require("express");
const { createRoom, getText } = require("../sqlz/utils");
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
module.exports = router;
