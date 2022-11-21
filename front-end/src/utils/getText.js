import axios from "axios"

const getText = async () => {
    try {
        let res = await axios.get(`${process.env.REACT_APP_HOST}/createRoom`, {
            withCredentials: true,
        })
        return res.data
    } catch (e) {
        console.log(e)
    }
}
export default getText
