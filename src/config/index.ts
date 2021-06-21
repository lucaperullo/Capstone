import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.NODE_ENV);
let baseURL = "";

if (process.env.NODE_ENV === "production") {
  baseURL = "http://localhost:5000";
} else {
  baseURL = process.env.REACT_APP_PROD || "";
}

const backend = axios.create({
  baseURL,
});

export { backend };
