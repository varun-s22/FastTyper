import io from "socket.io-client"

const socketConnection = async (roomId) => {
    const socket = io(`${process.env.REACT_APP_HOST}`, {
        path: "/room",
        withCredentials: true,
        transports: ["websocket"],
    })
    await socket.connect()
    socket.on("connect", () => {
        console.log("connection established (client side)")
    })
    socket.emit("join", {
        roomID: roomId,
    })
}
export default socketConnection
