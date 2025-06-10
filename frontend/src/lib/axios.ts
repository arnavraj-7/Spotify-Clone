import axios from "axios";

const baseURL=import.meta.env.MODE==="production"?import.meta.env.VITE_BACKEND_URL+"/api":"http://localhost:5000/api"
const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;