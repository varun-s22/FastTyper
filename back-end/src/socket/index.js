const connectUsers = (io) => {
  io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
    socket.on("join", async (event) => {
      socket.join(event.roomID);
      // fetches all users in room
      let sockets = await io.in(event.roomID).fetchSockets();
    });
  });
};
module.exports = { connectUsers };
