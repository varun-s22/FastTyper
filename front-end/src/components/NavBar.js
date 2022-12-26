import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../utils"
import UserContext from "./contexts/UserContext"
import "./NavBar.css"

const NavBar = (props) => {
    const { loggedInUser, setLoggedInUser, setLoggedInUserId } =
        useContext(UserContext)
    const navigateTo = useNavigate()

    let profileSection = async () => {
        navigateTo(`/profile`)
    }
    let logoutHandler = async () => {
        await logout()
        setLoggedInUser(null)
        setLoggedInUserId(null)
    }
    let goToHome = () => {
        navigateTo("/")
    }
    return (
        <div className="NavBar">
            <button onClick={goToHome} className="actionBtn">
                FastTyper
            </button>

            {loggedInUser ? (
                <span>
                    <button onClick={profileSection} className="actionBtn">
                        {loggedInUser}
                    </button>
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
