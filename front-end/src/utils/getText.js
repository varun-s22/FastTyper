import axios from "axios";

export default async (minLength = 300) => {
  let params = { minLength };
  let textToType = {};
  try {
    let res = await axios.get("https://api.quotable.io/random", { params });
    textToType = res.data.content;
  } catch (e) {
    console.log("Error while fetching text");
    console.log(e);
  }
  return textToType;
};
