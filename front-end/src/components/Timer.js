import { useState, useRef } from "react"

export default function Timer() {
    const formatTime = (currTime) => {
        const getSeconds = `0${currTime % 60}`.slice(-2)
        const minutes = `${Math.floor(currTime / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)

        return `${getMinutes} : ${getSeconds}`
    }

    const [currTime, setCurrTime] = useState(0)
    const increment = useRef(null)
    const handleStart = () => {
        increment.current = setInterval(() => {
            setCurrTime((currTime) => currTime + 1)
        }, 1000)
    }
    return (
        <div id="Timer">
            <h1>{formatTime(currTime)}</h1>
            <button className="timeStartBtn" onClick={handleStart}>
                Time start
            </button>
        </div>
    )
}
