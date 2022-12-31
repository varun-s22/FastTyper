import { useEffect, useState } from "react"
import { isAuthenticated } from "../utils"
import Error from "./Error"

const Authenticated = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const checkAuthenticated = async () => {
        try {
            let res = await isAuthenticated()
            return res
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const getResult = async () => {
            let res = await checkAuthenticated()
            setIsLoggedIn(res)
        }
        getResult()
    }, [])
    if (isLoggedIn) {
        return props.children
    } else {
        return (
            <Error
                heading="Not Signed In"
                description="You need to sign in to access these pages"
                suggestion="Sign In by clicking"
                navigateTo="/"
            />
        )
    }
}
export default Authenticated
