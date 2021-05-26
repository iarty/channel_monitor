import axios from "axios";

const apiV1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default apiV1;
