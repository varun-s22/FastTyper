import { useState } from "react";
import Timer from "./Timer";
const typing = require("../utils/typing");

function Text() {
  const [isClicked, setIsClicked] = useState(false);
  function getTyping() {
    typing();
    setIsClicked(true);
  }
  return (
    <div className="Text">
      <button onClick={getTyping}>Lets start</button>
      {isClicked ? <Timer /> : " "}
    </div>
  );
}
export default Text;
