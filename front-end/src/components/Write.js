import { useState, useRef } from "react"
import Timer from "./Timer"
import Text from "./Text"
import "./Write.css"

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
        <div className="Write">
            <Timer className="Timer" time={currTime} />
            <Text
                className="Text"
                startTimer={handleStart}
                stopTimer={handleStop}
            />
        </div>
    )
}
export default Write
