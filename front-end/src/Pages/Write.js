import { useState, useRef } from "react"
import Timer from "../components/Timer"
import Text from "../components/Text"
import "./Write.css"
import Authenticated from "../components/Authenticated"

const Write = () => {
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
    return (
        <Authenticated>
            <div className="Write">
                <Timer className="Timer" time={currTime} />
                <Text
                    className="Text"
                    startTimer={handleStart}
                    stopTimer={handleStop}
                />
            </div>
        </Authenticated>
    )
}
export default Write
