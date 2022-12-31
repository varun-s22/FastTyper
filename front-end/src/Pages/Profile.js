import Authenticated from "../components/Authenticated"
import NavBar from "../components/NavBar"
import "./Profile.css"

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
            <div className="Profile">
                <NavBar />
                <h1 className="user-name">{loggedInUser}</h1>
                <div className="scores">
                    {scoresOfUser &&
                        scoresOfUser.map((scoreObj) => (
                            <ul key={Math.random()}>
                                <li>
                                    {scoreObj.wpm} - {scoreObj.date}
                                </li>
                            </ul>
                        ))}
                </div>
            </div>
        </Authenticated>
    )
}
export default Profile
