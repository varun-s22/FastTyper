import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserDetails, login, logout } from "../utils"
const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    let loginHandler = async () => {
        await login()
    }
    let logoutHandler = async () => {
        await logout()
        setLoggedInUser("")
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
                    <Link to="/type">Type</Link>
                    <button onClick={logoutHandler}>Sign out</button>
                </div>
            )}
        </>
    )
}
export default Home
