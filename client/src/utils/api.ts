import axios from "axios";

// Define your backend's base URL
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Make sure this matches your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// This runs before every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // If token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;



