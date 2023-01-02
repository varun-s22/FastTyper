import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../utils"
import UserContext from "./contexts/UserContext"
import "./NavBar.css"

const NavBar = (props) => {
    const { loggedInUser, setLoggedInUser, setLoggedInUserId } =
        useContext(UserContext)
    const navigateTo = useNavigate()

    let logoutHandler = async () => {
        await logout()
        setLoggedInUser(null)
        setLoggedInUserId(null)
        navigateTo("/")
    }

    return (
        <div className="NavBar">
            <Link to="/" className="actionBtn">
                FastTyper
            </Link>
            <div>
                {loggedInUser ? (
                    <span className="rightDiv">
                        <img
                            src={
                                props.imgPath
                                    ? props.imgPath
                                    : "images/profile-picture.png"
                            }
                            alt="profile avatar"
                            className="profile-picture"
                        />
                        <Link to={`/profile`} className="actionBtn">
                            {loggedInUser}
                        </Link>
                        <button onClick={logoutHandler} className="actionBtn">
                            Sign out
                        </button>
                    </span>
                ) : (
                    <>
                        <button
                            onClick={props.aboutSection}
                            className="actionBtn"
                        >
                            About
                        </button>
                        <button
                            onClick={props.loginSection}
                            className="actionBtn"
                        >
                            Sign In
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
export default NavBar
