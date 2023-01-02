import "./App.css"
import Router from "./components/Router"
import { getUserDetails } from "./utils"
import UserContext from "./components/contexts/UserContext"
import { useState, useEffect } from "react"

function App() {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [loggedInUserEmail, setLoggedInUserEmail] = useState(null)
    const [loggedInUserId, setLoggedInUserId] = useState(null)
    const [userCreatedAt, setUserCreatedAt] = useState(null)
    useEffect(() => {
        let userDetails = async () => {
            try {
                let user = await getUserDetails()
                setLoggedInUser(user.data.name)
                setLoggedInUserId(user.data.id)
                setLoggedInUserEmail(user.data.username)
                setUserCreatedAt(user.data.createdAt)
            } catch (e) {
                console.log(e)
            }
        }
        userDetails()
    }, [])
    return (
        <UserContext.Provider
            value={{
                loggedInUser,
                loggedInUserId,
                setLoggedInUser,
                setLoggedInUserId,
                loggedInUserEmail,
                setLoggedInUserEmail,
                userCreatedAt,
                setUserCreatedAt,
            }}
        >
            <Router />
        </UserContext.Provider>
    )
}

export default App
