const connectUsers = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async (event) => {
      socket.join(event.roomID);
      socket.data.userID = event.userID;
      socket.data.userName = event.userName;
      // fetches all users in room
      let socketsInRoom = await io.in(event.roomID).fetchSockets();
      console.log(
        `${event.userID} joined the room ${event.roomID}. Number of users in room: ${socketsInRoom.length}`
      );
      io.to(event.roomID).emit("newUserJoined", {
        users: socketsInRoom.map((obj) => obj.data),
      });
    });
    socket.on("score", (res) => {
      socket.data.score = res.score;
    });
    socket.on("gameOver", (res) => {
      io.to(res.roomID).emit("gameOver");
    });
  });
};
const getUsersOfRoom = async (io, roomID) => {
  if (roomID === undefined || roomID === null) {
    throw new Error("Room Id not defined");
  }
  try {
    let connectedSockets = await io.in(roomID).fetchSockets();
    return connectedSockets.map((socketObj) => {
      return { data: socketObj.data };
    });
  } catch (e) {
    console.log(e);
    throw new Error("Error while fetching users of room");
  }
};
module.exports = { connectUsers, getUsersOfRoom };
