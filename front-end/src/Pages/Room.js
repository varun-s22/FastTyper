import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Timer from "../components/Timer"
import Text from "../components/Text"
import Authenticated from "../components/Authenticated"
import { socket, socketJoinRoom } from "../utils/socket"
import "./Write.css"
import { getTextFromRoom, getUsersOfRoom } from "../utils"
import UserContext from "../components/contexts/UserContext"
const Room = () => {
    const { id } = useParams()
    const [text, setText] = useState(null)
    const [currTime, setCurrTime] = useState(0)
    const [finishedUsers, setFinishedUsers] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)
    const { loggedInUserId } = useContext(UserContext)
    const increment = useRef(null)
    const handleStart = () => {
        increment.current = setInterval(() => {
            setCurrTime((currTime) => currTime + 1)
        }, 1000)
    }
    socket.on("gameOver", async () => {
        let finish = await getUsersOfRoom(id)
        setFinishedUsers(finish.filter((obj) => obj.data.score))
        setIsGameOver(true)
    })
    const handleStop = () => {
        clearInterval(increment.current)
    }
    const userHandler = async (userWPM) => {
        if (userWPM !== null && userWPM !== undefined) {
            let finish = await getUsersOfRoom(id)
            setFinishedUsers(finish.filter((obj) => obj.data.score))
        }
    }
    useEffect(() => {
        const establishConnection = async () => {
            await socketJoinRoom(id, loggedInUserId)
            setText(await getTextFromRoom(id))
        }
        establishConnection()
    }, [id, loggedInUserId])
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
            <h1>Room</h1>
            <div className="Write">
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
            {isGameOver &&
                finishedUsers.map((obj) => (
                    <ul key={Math.random()}>
                        <li>
                            {obj.data.userID} - {obj.data.score}
                        </li>
                    </ul>
                ))}
        </Authenticated>
    )
}
export default Room
