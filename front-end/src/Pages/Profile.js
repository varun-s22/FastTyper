import Authenticated from "../components/Authenticated"
import { useContext, useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { Chart } from "react-google-charts"
import UserContext from "../components/contexts/UserContext"
import { getScoresOfUsers, optionsForChart } from "../utils"
import "./Profile.css"

const Profile = () => {
    const { loggedInUserId, loggedInUser, loggedInUserEmail, userCreatedAt } =
        useContext(UserContext)
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
                <NavBar imgPath="../images/profile-picture.png" />
                <div className="LeftPane">
                    <div className="profile-info">
                        <div className="user-img">
                            <img
                                src="../images/profile-picture.png"
                                alt="profile avatar"
                                className="profile-avatar"
                            />
                        </div>
                        <div className="user-name">{loggedInUser}</div>
                        <div className="user-email">{loggedInUserEmail}</div>
                        <div className="user-joined">
                            User Joined:{" "}
                            {new Date(userCreatedAt).toDateString()}
                        </div>
                    </div>
                    <div className="stats">
                        <h2>Stats</h2>
                        <div>
                            Max Score :{" "}
                            {Math.max(
                                ...scoresOfUser.map((scoreObj) => scoreObj.wpm)
                            )}{" "}
                            wpm
                        </div>
                        <div>
                            Min Score :{" "}
                            {Math.min(
                                ...scoresOfUser.map((scoreObj) => scoreObj.wpm)
                            )}{" "}
                            wpm
                        </div>
                    </div>
                </div>
                <Chart
                    className="chart"
                    chartType="LineChart"
                    width="50vw"
                    height="55vh"
                    data={[
                        ["Date", "WPM", { role: "style" }],
                        ...scoresOfUser.map((obj) => {
                            return [obj.newDate, obj.wpm, "color:#fccc62"]
                        }),
                    ]}
                    options={optionsForChart}
                />
            </div>
        </Authenticated>
    )
}
export default Profile
