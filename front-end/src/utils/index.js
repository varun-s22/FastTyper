const isCorrect = (text, char, i) => {
    return text[i] === char
}
const getClassName = (text, char, i) => {
    return isCorrect(text, char, i) ? "correct" : "wrong"
}
export { isCorrect, getClassName }
