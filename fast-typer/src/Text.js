import { useState } from "react"
const getText = require("./utils/getText")

function Text() {
    const [text, setText] = useState("")
    async function getTypingText() {
        let text = await getText(300)
        setText(text.text)
    }
    return (
        <div className="Text">
            {text}
            {text === "" ? (<button onClick={getTypingText}>Lets start</button>) : ""}

        </div>
    );
}
export default Text