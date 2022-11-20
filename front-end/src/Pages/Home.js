import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserDetails, login, logout } from "../utils"
import socketConnection from "../utils/socket"
const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    const navigateTo = useNavigate()
    let loginHandler = async () => {
        await login()
    }
    let logoutHandler = async () => {
        await logout()
        setLoggedInUser("")
    }
    let joinRoom = async () => {
        await socketConnection()
        navigateTo("/room")
    }
    useEffect(() => {
        let userDetails = async () => {
            try {
                let user = await getUserDetails()
                setLoggedInUser(user.data.name)
            } catch (e) {
                console.log(e)
            }
        }
        userDetails()
    }, [])
    return (
        <>
            <h1> Home page</h1>
            {!loggedInUser && <button onClick={loginHandler}>Sign In</button>}
            <p>{loggedInUser}</p>
            {loggedInUser && (
                <div>
                    <button onClick={joinRoom}>Join Room</button>
                    <button onClick={logoutHandler}>Sign out</button>
                </div>
            )}
        </>
    )
}
export default Home
