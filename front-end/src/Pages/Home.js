import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../components/contexts/UserContext"
import DialogBox from "../components/DialogBox"
import NavBar from "../components/NavBar"
import { login } from "../utils"
import getText from "../utils/getText"
import "./Home.css"

const Home = () => {
    const [roomId, setRoomId] = useState(null)
    const [openDialogBox, setOpenDialogBox] = useState(false)
    const { loggedInUser } = useContext(UserContext)
    const roomInput = useRef(null)
    const navigateTo = useNavigate()

    let loginHandler = async () => {
        await login()
    }

    let createRoom = async () => {
        let res = await getText()
        setRoomId(res.id)
        navigateTo(`/room/${res.id}`)
    }

    let joinRoom = async (e) => {
        e.preventDefault()
        setRoomId(roomInput.current.value)
        navigateTo(`/room/${roomInput.current.value}`)
    }
    let aboutSection = () => {
        let arrow = document.querySelector(".page2")
        arrow.scrollIntoView()
    }
    let loginSection = () => {
        let arrow = document.querySelector(".page3")
        arrow.scrollIntoView()
    }
    let showDialogBox = () => {
        setOpenDialogBox(true)
    }
    return (
        <div className="Home">
            {loggedInUser ? (
                <div className="page1">
                    <NavBar
                        aboutSection={aboutSection}
                        loginSection={loginSection}
                    />
                    <div className="btnGrp">
                        <button onClick={createRoom} className="homeButtons">
                            Create Multiplayer
                        </button>
                        <button className="homeButtons">Play</button>
                        <button className="homeButtons" onClick={showDialogBox}>
                            Join Multiplayer
                        </button>
                        <button className="homeButtons">Leaderboard</button>
                        {openDialogBox && (
                            <DialogBox
                                heading="Join Room"
                                content={
                                    <div>
                                        <span className="contentHeading">
                                            Enter room id to join
                                        </span>
                                        <form
                                            onSubmit={joinRoom}
                                            className="inputDiv"
                                        >
                                            <input
                                                type="text"
                                                ref={roomInput}
                                                className="roomInputField"
                                                placeholder="Enter room id here"
                                            />
                                            <button
                                                type="submit"
                                                className="submitBtn"
                                            >
                                                Join
                                            </button>
                                        </form>
                                    </div>
                                }
                                hideDialogBox={() => setOpenDialogBox(false)}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="page1">
                        <NavBar
                            aboutSection={aboutSection}
                            loginSection={loginSection}
                        />

                        <div className="headingDiv">
                            <h1 className="heading">FastTyper</h1>
                        </div>
                        <div className="arrow" onClick={aboutSection}>
                            <img
                                src="images/down-chevron.png"
                                className="down-arrows"
                                alt="down pointing chevrons"
                            />
                        </div>
                    </div>
                    <div className="page2">
                        <div className="page2-inner">
                            <div className="room-info">
                                Join and Create rooms, to compete with other
                                players live.
                            </div>
                            <img
                                src="images/room.png"
                                className="room-image"
                                alt="creating/joining rooms"
                            />
                        </div>
                        <div className="arrow" onClick={loginSection}>
                            <img
                                src="images/down-chevron.png"
                                className="down-arrows"
                                alt="down pointing chevrons"
                            />
                        </div>
                    </div>
                    <div className="page3">
                        <div className="info">
                            <div className="svgArt">
                                <img
                                    src="images/info-art.svg"
                                    className="art"
                                    alt="info art"
                                />
                            </div>
                            <div className="text">
                                You think you can type fast?.. Compete with
                                others live, to get accurate results.
                                <h3>Want to try FastTyper?</h3>
                                {!loggedInUser && (
                                    <button
                                        onClick={loginHandler}
                                        className="googleBtn"
                                    >
                                        <img
                                            src="images/google-logo.png"
                                            className="googleLogo"
                                            alt="google icon"
                                        />
                                        <span className="btnText">
                                            Continue With Google
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Home
