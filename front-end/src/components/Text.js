import { useEffect, useState, useRef } from "react"
import { getClassName, isCorrect } from "../utils/index"
import getScore from "../utils/getScore"
import getText from "../utils/getText"
import "./Text.css"

const Text = (props) => {
    const [text, setText] = useState(null)
    const [enteredText, setEnteredText] = useState(null)
    const [correctChar, setCorrectChar] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [userWPM, setUserWPM] = useState(false)
    const focusRef = useRef(null)
    useEffect(() => {
        const fetchText = async () => {
            setText(await getText())
        }
        fetchText()
        focusRef.current.focus()
    }, [])
    const keyEventHandler = (e) => {
        let currentKeyPressed = e.nativeEvent.data

        setUserWPM(
            getScore(
                isTyping,
                setIsTyping,
                startTime,
                setStartTime,
                text,
                currentKeyPressed,
                props.startTimer,
                props.stopTimer
            )
        )
        setEnteredText(e.target.value)
        if (isCorrect(text, currentKeyPressed, correctChar)) {
            setCorrectChar(correctChar + 1)
        }
    }
    const spans = enteredText?.split("").map((char, i) => (
        <span key={i} className={getClassName(text, char, i)}>
            {!isCorrect(text, char, i) && char === " " ? "_" : char}
        </span>
    ))
    return (
        <div className="Text">
            <>{text}~</>
            <input
                type="text"
                ref={focusRef}
                className="hidden"
                onChange={keyEventHandler}
            />
            <div className="enteredText">{spans}</div>
            <div>{userWPM} wpm</div>
        </div>
    )
}
export default Text
