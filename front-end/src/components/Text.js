import { useState } from "react"
const typing = require("../utils/typing")

function Text() {
    const [text, setText] = useState("")
    function getTyping() {
        typing()
    }
    return (
        <div className="Text">
            {text}
            {text === "" ? (<button onClick={getTyping}>Lets start</button>) : ""}
        </div>
    );
}
export default Text