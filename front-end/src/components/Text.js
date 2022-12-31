import { useEffect, useState, useRef, useContext } from "react"
import { getClassName, isCorrect, publishScore } from "../utils/index"
import UserContext from "../components/contexts/UserContext"
import getScore from "../utils/getScore"
import { socket } from "../utils/socket"
import "./Text.css"

const Text = (props) => {
    const [enteredText, setEnteredText] = useState()
    const [correctChar, setCorrectChar] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [userWPM, setUserWPM] = useState(null)
    const { loggedInUserId } = useContext(UserContext)
    const focusRef = useRef(null)
    useEffect(() => {
        focusRef.current.focus()
        let pushScore = async (id, wpm) => {
            await publishScore(id, wpm)
        }
        if (userWPM !== null && userWPM !== undefined) {
            socket.emit("score", {
                score: userWPM,
                userID: loggedInUserId,
            })
            props.userHandler(userWPM)
            pushScore(loggedInUserId, userWPM)
        }
    }, [userWPM, loggedInUserId])
    const keyEventHandler = (e) => {
        let currentKeyPressed = e.nativeEvent.data
        if (!isTyping || currentKeyPressed === "~") {
            setUserWPM(
                getScore(
                    isTyping,
                    setIsTyping,
                    startTime,
                    setStartTime,
                    correctChar,
                    props.text,
                    currentKeyPressed,
                    props.startTimer,
                    props.stopTimer
                )
            )
        }
        setEnteredText(e.target.value)
        if (isCorrect(props.text, currentKeyPressed, correctChar)) {
            setCorrectChar(correctChar + 1)
        }
    }
    const spans = enteredText?.split("").map((char, i) => (
        <span key={i} className={getClassName(props.text, char, i)}>
            {!isCorrect(props.text, char, i) && char === " " ? "_" : char}
        </span>
    ))
    return (
        <div className="Text">
            <div className="text-to-type">{props.text}~</div>
            <input
                type="text"
                ref={focusRef}
                onChange={keyEventHandler}
                className="hidden"
            />
            <div className="enteredText">{spans}</div>
            {userWPM && <div className="score">{userWPM} wpm</div>}
        </div>
    )
}
export default Text
