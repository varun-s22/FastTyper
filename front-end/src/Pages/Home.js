import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { newUserLogin, getUserDetails, logOut } from "../utils"
const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    let loginHandler = () => {
        newUserLogin()
    }
    let logOutUser = async () => {
        await logOut()
        setLoggedInUser("")
    }
    useEffect(() => {
        let getData = async () => {
            try {
                let userDetails = await getUserDetails()
                setLoggedInUser(userDetails.data.name)
            } catch (e) {
                console.log("Error while setting logged in user")
                console.log(e)
            }
        }
        getData()
    }, [])
    return (
        <>
            <h1> Home page</h1>
            {!loggedInUser && <button onClick={loginHandler}>Sign In</button>}
            <p>{loggedInUser}</p>
            {loggedInUser && (
                <div>
                    <Link to="/type">Type</Link>
                    <button onClick={logOutUser}>Sign out</button>
                </div>
            )}
        </>
    )
}
export default Home
