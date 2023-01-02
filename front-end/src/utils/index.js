import axios from "axios"

const isCorrect = (text, char, i) => {
    return text[i] === char
}
const getClassName = (text, char, i) => {
    return isCorrect(text, char, i) ? "correct" : "wrong"
}
const login = () => {
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
const logout = async () => {
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
const isAuthenticated = async () => {
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_HOST}/authenticated`,
            {
                withCredentials: true,
            }
        )
        return res.data.isLoggedIn
    } catch (e) {
        return e.response.data.isLoggedIn
    }
}
const getTextFromRoom = async (roomID) => {
    let params = { roomID }
    try {
        let res = await axios.get(`${process.env.REACT_APP_HOST}/joinRoom`, {
            params,
            withCredentials: true,
        })
        return res.data.text
    } catch (e) {
        console.log(e)
    }
}
const publishScore = async (id, wpm) => {
    let data = {
        id,
        wpm,
        date: Date(),
    }
    try {
        let res = await axios.post(
            `${process.env.REACT_APP_HOST}/score`,
            data,
            {
                withCredentials: true,
            }
        )
        return res
    } catch (e) {
        console.log("Error while pushing score (client side)")
        console.log(e)
    }
}
const getUsersOfRoom = async (roomID) => {
    let params = { roomID }
    try {
        let res = await axios.get(`${process.env.REACT_APP_HOST}/users`, {
            params,
            withCredentials: true,
        })
        return res.data.users
    } catch (e) {
        console.log("Error while getting users of room")
        console.log(e)
    }
}
const getScoresOfUsers = async (userID) => {
    let params = { id: userID }
    try {
        let res = await axios.get(`${process.env.REACT_APP_HOST}/scores`, {
            params,
            withCredentials: true,
        })
        const newScores = res.data.scores.map((obj) => {
            return {
                ...obj,
                newDate: new Date(obj.date).toDateString().slice(4),
            }
        })
        console.log(newScores)
        return newScores
    } catch (e) {
        console.log("Error while getting scores of user")
        console.log(e)
    }
}
const optionsForChart = {
    title: `User performance`,
    titleTextStyle: {
        color: "#f9f4da",
        fontSize: "20",
    },
    legend: {
        position: "bottom",
        textStyle: { color: "#f9f4da" },
    },
    curveType: "function",
    hAxis: {
        title: "Date",
        textStyle: { color: "#f9f4da" },
        titleTextStyle: {
            color: "#f9f4da",
            fontSize: "17",
        },
    },
    vAxis: {
        title: "WPM",
        minValue: 0,
        maxValue: 120,
        textStyle: { color: "#f9f4da" },
        titleTextStyle: {
            color: "#f9f4da",
            fontSize: "17",
        },
    },
    animation: {
        startup: true,
        easing: "linear",
        duration: 1500,
    },
    backgroundColor: "transparent",
    colors: ["#fccc62", "#f9f4da"],
}
export {
    isCorrect,
    getClassName,
    login,
    logout,
    getUserDetails,
    isAuthenticated,
    getTextFromRoom,
    publishScore,
    getUsersOfRoom,
    getScoresOfUsers,
    optionsForChart,
}
