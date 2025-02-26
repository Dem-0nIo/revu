import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_URL_API || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the instance to use in different components
export default api;