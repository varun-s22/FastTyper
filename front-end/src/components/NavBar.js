import { useContext } from "react"
import { Link } from "react-router-dom"
import { logout } from "../utils"
import UserContext from "./contexts/UserContext"
import "./NavBar.css"

const NavBar = (props) => {
    const { loggedInUser, setLoggedInUser, setLoggedInUserId } =
        useContext(UserContext)

    let logoutHandler = async () => {
        await logout()
        setLoggedInUser(null)
        setLoggedInUserId(null)
    }

    return (
        <div className="NavBar">
            <Link to="/" className="actionBtn">
                FastTyper
            </Link>
            {loggedInUser ? (
                <span>
                    <Link to="/profile" className="actionBtn">
                        {loggedInUser}
                    </Link>
                    <button onClick={logoutHandler} className="actionBtn">
                        Sign out
                    </button>
                </span>
            ) : (
                <>
                    <button onClick={props.scrollDown} className="actionBtn">
                        About
                    </button>
                </>
            )}
        </div>
    )
}
export default NavBar
