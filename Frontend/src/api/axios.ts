import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "/api";
const API = axios.create({
    baseURL,
});

export default API;