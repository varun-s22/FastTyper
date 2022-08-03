import { useState, useRef } from "react"
import Timer from "./Timer"
import Text from "./Text"

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
            <Text startTimer={handleStart} stopTimer={handleStop} />
            <Timer time={currTime} />
        </div>
    )
}
export default Write
