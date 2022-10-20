import axios from "axios"
const isCorrect = (text, char, i) => {
    return text[i] === char
}
const getClassName = (text, char, i) => {
    return isCorrect(text, char, i) ? "correct" : "wrong"
}
const newUserLogin = async () => {
    window.location.href = `${process.env.REACT_APP_HOST}/login/federated/google`
}
const getUserDetails = async () => {
    try {
        let userDetails = await axios.get(
            `${process.env.REACT_APP_HOST}/user`,
            {
                withCredentials: true,
            }
        )
        return userDetails
    } catch (e) {
        console.log(e)
    }
}
const logOut = async () => {
    try {
        let res = await axios.post(
            `${process.env.REACT_APP_HOST}/logout`,
            null,
            {
                withCredentials: true,
            }
        )
        return res
    } catch (e) {
        console.log(e)
    }
}
export { isCorrect, getClassName, newUserLogin, getUserDetails, logOut }
