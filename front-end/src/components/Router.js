import { Route, Routes } from "react-router-dom"
import Type from "../Pages/Type"
import Home from "../Pages/Home"

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/type" element={<Type />} />
        </Routes>
    )
}
export default Router
