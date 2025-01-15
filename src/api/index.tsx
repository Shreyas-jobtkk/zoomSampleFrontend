import axios from "axios";
import { apiUrl } from "../components/constants";

const API_URL = apiUrl;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
// export * from "./apiService/company/company-api-service";
