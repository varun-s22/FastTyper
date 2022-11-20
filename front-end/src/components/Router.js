import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Room from "../Pages/Room"
import Write from "../Pages/Write"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/type" element={<Write />} />
            <Route path="/room" element={<Room />} />
        </Routes>
    )
}
export default Router
