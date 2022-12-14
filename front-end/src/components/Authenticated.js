import { useEffect, useState } from "react"
const { isAuthenticated } = require("../utils")

const Authenticated = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const checkAuthenticated = async () => {
        try {
            let res = await isAuthenticated()
            console.log(res)
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
            <>
                <h1>Error</h1>
            </>
        )
    }
}
export default Authenticated
