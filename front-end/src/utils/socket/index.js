import io from "socket.io-client"

const socket = io(`${process.env.REACT_APP_HOST}`, {
    path: "/room",
    withCredentials: true,
    transports: ["websocket"],
})
socket.connect()
socket.on("connect", () => {
    console.log("connection established (client side)")
})
const socketJoinRoom = async (roomId, userID, userName) => {
    socket.emit("join", {
        roomID: roomId,
        userID,
        userName,
    })
}
export { socket, socketJoinRoom }
