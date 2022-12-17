import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../components/contexts/UserContext"
import NavBar from "../components/NavBar"
import getText from "../utils/getText"
import "./Home.css"
const Home = () => {
    const [setRoomId] = useState(null)
    const { loggedInUser } = useContext(UserContext)
    const roomInput = useRef(null)
    const navigateTo = useNavigate()

    let createRoom = async () => {
        let res = await getText()
        navigateTo(`/room/${res.id}`)
    }

    let joinRoom = async (e) => {
        e.preventDefault()
        setRoomId(roomInput.current.value)
        navigateTo(`/room/${roomInput.current.value}`)
    }
    return (
        <div className="Home">
            <NavBar />
            <h1 className="heading">FastTyper</h1>
            {loggedInUser && (
                <div>
                    <button onClick={createRoom}>Create Room</button>
                    <div>
                        <form onSubmit={joinRoom}>
                            <input type="text" ref={roomInput} />
                            <button type="submit">Join Room</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Home
