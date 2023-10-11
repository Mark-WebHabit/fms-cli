import axios from "axios";

export default axios.create({
  baseURL: "https://fms.onrender.com",
  withCredentials: true,
});
