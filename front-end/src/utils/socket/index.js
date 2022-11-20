import io from "socket.io-client"

const socketConnection = async () => {
    const socket = io(`${process.env.REACT_APP_HOST}`, {
        path: "/room",
        withCredentials: true,
        transports: ["websocket"],
    })
    await socket.connect()
    socket.on("connect", () => {
        console.log("client side connection socket")
        console.log(socket.id)
    })
    socket.emit("join", {
        roomId: "roomID!",
    })
}
export default socketConnection
