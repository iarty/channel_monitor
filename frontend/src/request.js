import axios from "axios";

const apiV1 = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: process.env.REACT_APP_API_URL,
});

export default apiV1;
