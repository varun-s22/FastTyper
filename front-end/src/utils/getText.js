const axios = require("axios")

const getText = async (minLength) => {
    let params = { minLength }
    let textToType = {}
    try {
        let res = await axios.get("https://api.quotable.io/random", { params })
        textToType.text = res.data.content
    }
    catch (e) {
        console.log("Error while fetching text")
        console.log(e)
    }
    return textToType
}
module.exports = getText