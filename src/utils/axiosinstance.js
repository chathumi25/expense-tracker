import axios from "axios";
import { BASE_URL } from "./apiPaths";  

const axiosInstance = axios.create({
  baseURL: BASE_URL || "http://localhost:8000",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Attach JWT token if available
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // ✅ Prevent caching for GET requests (safe version)
    if (config.method === "get" && config.url) {
      const separator = config.url.includes("?") ? "&" : "?";
      config.url = `${config.url}${separator}_=${Date.now()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor for errors
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) window.location.href = "/login";
      else if (error.response.status === 500) console.error("Server error");
    } else if (error.code === "ECONNABORTED") console.error("Request timeout");
    else console.error("Network error:", error.message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
