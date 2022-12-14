import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Profile from "../Pages/Profile"
import Room from "../Pages/Room"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<Room />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}
export default Router
