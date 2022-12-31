import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Profile from "../Pages/Profile"
import Room from "../Pages/Room"
import Error from "./Error"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/profile" element={<Profile />} />
            <Route
                path="*"
                element={
                    <Error
                        heading="404"
                        description="Oops!! Looks like this page doesn't exist"
                        suggestion="Go to home by clicking"
                        navigateTo="/"
                    />
                }
            />
        </Routes>
    )
}
export default Router
