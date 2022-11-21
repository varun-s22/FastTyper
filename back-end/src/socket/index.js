const connectUsers = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", async (event) => {
      socket.join(event.roomID);
      // fetches all users in room
      let sockets = await io.in(event.roomID).fetchSockets();
      console.log(sockets.length);
    });
  });
};
module.exports = { connectUsers };
