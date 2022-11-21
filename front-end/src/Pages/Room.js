import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import Timer from "../components/Timer"
import Text from "../components/Text"
import Authenticated from "../components/Authenticated"
import socketConnection from "../utils/socket"
import "./Write.css"
import { getTextFromRoom } from "../utils"
const Room = () => {
    const { id } = useParams()
    const [text, setText] = useState(null)
    const [currTime, setCurrTime] = useState(0)
    const increment = useRef(null)
    const handleStart = () => {
        increment.current = setInterval(() => {
            setCurrTime((currTime) => currTime + 1)
        }, 1000)
    }
    const handleStop = () => {
        clearInterval(increment.current)
    }

    useEffect(() => {
        const establishConnection = async () => {
            await socketConnection(id)
            setText(await getTextFromRoom(id))
        }
        establishConnection()
    }, [id])

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
                />
            </div>
        </Authenticated>
    )
}
export default Room
