import axios from "axios";
console.log(process.env.REACT_APP_API_URL);
const apiV1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiV1;
