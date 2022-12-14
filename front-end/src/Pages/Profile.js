import Authenticated from "../components/Authenticated"

const { useContext, useState, useEffect } = require("react")
const { default: UserContext } = require("../components/contexts/UserContext")
const { getScoresOfUsers } = require("../utils")

const Profile = () => {
    const { loggedInUser, loggedInUserId } = useContext(UserContext)
    const [scoresOfUser, setScoresOfUser] = useState([])
    useEffect(() => {
        let getScores = async () => {
            let scores = await getScoresOfUsers(loggedInUserId)
            setScoresOfUser(scores)
        }
        getScores()
    }, [loggedInUserId])

    return (
        <Authenticated>
            <h1>{loggedInUser}</h1>
            {scoresOfUser &&
                scoresOfUser.map((scoreObj) => (
                    <ul key={Math.random()}>
                        <li>
                            {scoreObj.wpm} - {scoreObj.date}
                        </li>
                    </ul>
                ))}
        </Authenticated>
    )
}
export default Profile
