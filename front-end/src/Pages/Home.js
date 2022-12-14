import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../components/contexts/UserContext"
import { login, logout } from "../utils"
import getText from "../utils/getText"
const Home = () => {
    const [setRoomId] = useState(null)
    const { loggedInUser, setLoggedInUser, setLoggedInUserId, loggedInUserId } =
        useContext(UserContext)
    const roomInput = useRef(null)
    const navigateTo = useNavigate()
    let loginHandler = async () => {
        await login()
    }
    let logoutHandler = async () => {
        await logout()
        setLoggedInUser(null)
        setLoggedInUserId(null)
    }
    let createRoom = async () => {
        let res = await getText()
        navigateTo(`/room/${res.id}`)
    }
    let profileSection = async () => {
        navigateTo(`/profile`)
    }
    let joinRoom = async (e) => {
        e.preventDefault()
        setRoomId(roomInput.current.value)
        navigateTo(`/room/${roomInput.current.value}`)
    }
    return (
        <>
            <h1> Home page</h1>
            {!loggedInUser && <button onClick={loginHandler}>Sign In</button>}
            <p>{loggedInUser}</p>
            {loggedInUser && <button onClick={profileSection}>Profile</button>}
            {loggedInUser && (
                <div>
                    <button onClick={createRoom}>Create Room</button>
                    <div>
                        <form onSubmit={joinRoom}>
                            <input type="text" ref={roomInput} />
                            <button type="submit">Join Room</button>
                        </form>
                    </div>
                    <button onClick={logoutHandler}>Sign out</button>
                </div>
            )}
        </>
    )
}
export default Home
