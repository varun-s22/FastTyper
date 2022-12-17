import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { login, logout } from "../utils"
import UserContext from "./contexts/UserContext"
import "./NavBar.css"

const NavBar = () => {
    const { loggedInUser, setLoggedInUser, setLoggedInUserId } =
        useContext(UserContext)
    const navigateTo = useNavigate()

    let loginHandler = async () => {
        await login()
    }
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
            {!loggedInUser && (
                <button onClick={loginHandler} className="actionBtn">
                    Sign In
                </button>
            )}
            {loggedInUser && (
                <span>
                    <button onClick={profileSection}>{loggedInUser}</button>
                    <button onClick={logoutHandler} className="actionBtn">
                        Sign out
                    </button>
                </span>
            )}
        </div>
    )
}
export default NavBar
