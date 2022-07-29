import { useEffect, useState, useRef } from "react"
import getText from "../utils/getText"

function Text() {
    const [text, setText] = useState(null)
    const [enteredText, setEnteredText] = useState(null)
    const [isTyping, setIsTyping] = useState(false)
    const [startTime, setStartTime] = useState(0)
    const [correctChar, setCorrectChar] = useState(0)
    const [userWPM, setUserWPM] = useState(0)
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

        if (!isTyping) {
            setStartTime(Date.now())
            setIsTyping(true)
            let timeBtn = document.querySelector(".timeStartBtn")
            timeBtn.click()
        }
        if (currentKeyPressed === "~") {
            setIsTyping(false)
            let duration = (Date.now() - startTime) / (60 * 1000)
            let words = text.split(" ")
            let ans = Math.floor(words.length / duration)
            setUserWPM(ans)
        }
        setEnteredText(e.target.value)
        if (isCorrect(currentKeyPressed, correctChar)) {
            setCorrectChar(correctChar + 1)
        }
    }
    const getClassName = (char, i) => {
        return isCorrect(char, i) ? "correct" : "wrong"
    }
    const isCorrect = (char, i) => {
        return text[i] === char
    }
    const spans = enteredText?.split("").map((char, i) => (
        <span key={i} className={getClassName(char, i)}>
            {!isCorrect(char, i) && char === " " ? "_" : char}
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
