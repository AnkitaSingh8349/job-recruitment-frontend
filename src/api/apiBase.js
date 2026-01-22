// src/api/apiBase.js
import axios from "axios";

const base = import.meta.env.VITE_API_BASE_URL;

const apiBase = axios.create({
  baseURL: base.endsWith("/api") ? base : `${base}/api`,
});

apiBase.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access") ||
      localStorage.getItem("admin_access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiBase;
