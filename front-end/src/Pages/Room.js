import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Timer from "../components/Timer"
import Text from "../components/Text"
import Authenticated from "../components/Authenticated"
import { socket, socketJoinRoom } from "../utils/socket"
import { getTextFromRoom, getUsersOfRoom } from "../utils"
import UserContext from "../components/contexts/UserContext"
import DialogBox from "../components/DialogBox"
import Participants from "../components/Participants"
import "./Room.css"

const Room = () => {
    const { id } = useParams()
    const [text, setText] = useState(null)
    const [currTime, setCurrTime] = useState(0)
    const [finishedUsers, setFinishedUsers] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const [openDialogBox, setOpenDialogBox] = useState(false)
    const { loggedInUser, loggedInUserId } = useContext(UserContext)
    const increment = useRef(null)

    const handleStart = () => {
        increment.current = setInterval(() => {
            setCurrTime((currTime) => currTime + 1)
        }, 1000)
    }
    const handleStop = () => {
        clearInterval(increment.current)
    }

    socket.on("gameOver", async () => {
        let finish = await getUsersOfRoom(id)
        setFinishedUsers(finish.filter((obj) => obj.data.score))
        setIsGameOver(true)
    })
    const userHandler = async (userWPM) => {
        if (userWPM !== null && userWPM !== undefined) {
            let finish = await getUsersOfRoom(id)
            setOpenDialogBox(true)
            setFinishedUsers(finish.filter((obj) => obj.data.score))
        }
    }
    useEffect(() => {
        const establishConnection = async () => {
            await socketJoinRoom(id, loggedInUserId, loggedInUser)
            setText(await getTextFromRoom(id))
            socket.emit("newUserJoined")
        }
        establishConnection()
    }, [id, loggedInUserId, loggedInUser])
    useEffect(() => {
        const gameOver = async () => {
            let connectedUsers = await getUsersOfRoom(id)
            if (connectedUsers.length === finishedUsers.length) {
                socket.emit("gameOver", {
                    roomID: id,
                })
            }
        }
        if (!isGameOver) gameOver()
    }, [finishedUsers, isGameOver, id])

    return (
        <Authenticated>
            <div className="Room">
                <h1 className="room-name">Room</h1>
                <div className="write-area">
                    <Timer className="Timer" time={currTime} />
                    <Text
                        className="Text"
                        startTimer={handleStart}
                        stopTimer={handleStop}
                        text={text}
                        roomID={id}
                        userHandler={userHandler}
                    />
                </div>
                <Participants />
                {isGameOver && openDialogBox && (
                    <DialogBox
                        heading="Game Over"
                        hideDialogBox={() => setOpenDialogBox(false)}
                        content={finishedUsers.map((obj) => (
                            <li>
                                {obj.data.userName} - {obj.data.score} wpm
                            </li>
                        ))}
                    />
                )}
            </div>
        </Authenticated>
    )
}
export default Room
