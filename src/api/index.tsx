import axios from "axios";
import { apiUrl } from "../apiUrl";

const API_URL = apiUrl;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
