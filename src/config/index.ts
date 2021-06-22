import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
let baseURL = "";

if (process.env.NODE_ENV === "production") {
  baseURL = "https://capstonebe.herokuapp.com/";
} else {
  baseURL = process.env.REACT_APP_PROD || "https://capstonebe.herokuapp.com/";
}

const backend = axios.create({
  baseURL,
});

export { backend };
