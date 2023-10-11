import axios from "axios";

export default axios.create({
  baseURL: "http://fms.onrender.com",
  withCredentials: true,
});
