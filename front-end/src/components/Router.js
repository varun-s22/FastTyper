import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Write from "../Pages/Write"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/type" element={<Write />} />
        </Routes>
    )
}
export default Router
