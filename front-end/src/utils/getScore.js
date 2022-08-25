const getScore = (
    isTyping,
    setIsTyping,
    startTime,
    setStartTime,
    text,
    currentKeyPressed,
    startTimer,
    stopTimer
) => {
    if (!isTyping) {
        setStartTime(Date.now())
        setIsTyping(true)
        startTimer()
    }
    if (currentKeyPressed === "~") {
        setIsTyping(false)
        stopTimer()
        let duration = (Date.now() - startTime) / (60 * 1000)
        let words = text.split(" ")
        let ans = Math.floor(words.length / duration)
        return ans
    }
}
export default getScore
