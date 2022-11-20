import Authenticated from "../components/Authenticated"
import Write from "./Write"

const Room = () => {
    return (
        <Authenticated>
            <div>
                <h1>Room</h1>
                <Write />
            </div>
        </Authenticated>
    )
}
export default Room
