import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserDetails, login, logout } from "../utils"
import getText from "../utils/getText"
const Home = () => {
    const [roomId, setRoomId] = useState(null)
    const [loggedInUser, setLoggedInUser] = useState("")
    const roomInput = useRef(null)
    const navigateTo = useNavigate()
    let loginHandler = async () => {
        await login()
    }
    let logoutHandler = async () => {
        await logout()
        setLoggedInUser("")
    }
    let createRoom = async () => {
        let res = await getText()
        navigateTo(`/room/${res.id}`)
    }
    let joinRoom = async (e) => {
        e.preventDefault()
        setRoomId(roomInput.current.value)
        navigateTo(`/room/${roomId}`)
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
