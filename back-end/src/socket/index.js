const connectUsers = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async (event) => {
      socket.join(event.roomID);
      socket.data.userID = event.userID;
      // fetches all users in room
      let sockets = await io.in(event.roomID).fetchSockets();
      console.log(
        `${event.userID} joined the room ${event.roomID}. Number of users in room: ${sockets.length}`
      );
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
  try {
    let connectedSockets = await io.in(roomID).fetchSockets();
    return connectedSockets.map((socketObj) => {
      return { data: socketObj.data };
    });
  } catch (e) {
    console.log("Error while fetching users of room");
    console.log(e);
  }
};
module.exports = { connectUsers, getUsersOfRoom };
