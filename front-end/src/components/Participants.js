import { useState } from "react"
import { socket } from "../utils/socket"
import "./Participants.css"
const Participants = () => {
    const [joinedUsers, setJoinedUsers] = useState([])
    socket.on("newUserJoined", async (res) => {
        setJoinedUsers(res.users)
    })
    return (
        <div className="Participants">
            <h2 className="participant-heading">Participants</h2>
            <div className="participants-list">
                {joinedUsers.map((obj) => (
                    <li key={Math.random()}>{obj.userName}</li>
                ))}
            </div>
        </div>
    )
}
export default Participants
