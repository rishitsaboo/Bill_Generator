import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";
const API = axios.create({
    baseURL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;