// src/utils/axiosinstance.js
import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create axios instance with proper baseURL
const axiosInstance = axios.create({
  baseURL: BASE_URL, // uses correct URL from apiPaths
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attach JWT token if available
axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers) config.headers = {};

    // Add Authorization header
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    // Prevent caching for GET requests
    if (config.method?.toLowerCase() === "get" && config.url) {
      const separator = config.url.includes("?") ? "&" : "?";
      config.url = `${config.url}${separator}_=${Date.now()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Unauthorized, redirect to login
      window.location.href = "/login";
    } else if (status === 404) {
      console.error("Resource not found:", error.response?.config?.url);
    } else if (status === 500) {
      console.error("Server error:", error.response?.data?.message || "Internal server error");
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
