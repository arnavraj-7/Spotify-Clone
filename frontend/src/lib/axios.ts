import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;