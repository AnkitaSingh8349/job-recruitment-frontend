// src/pages/admin/services/adminApi.js
import axios from "axios";

const base = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const adminApi = axios.create({
  // ensure base ends with /api (adjust if your VITE var already includes /api)
  baseURL: base.endsWith("/api") ? base : `${base}/api`,
});

// Attach access token (try 'access' first; fall back to 'admin_access' if present)
adminApi.interceptors.request.use(
  (config) => {
    // prefer the unified token key 'access' (what your Login saves)
    const token = localStorage.getItem("access") || localStorage.getItem("admin_access");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= OPTIONAL: auto-handle 401 =================
   Uncomment this block if you want the app to clear auth and redirect
   to /login automatically when a protected request returns 401.
*/
/*
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // clear tokens + user
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      // redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);
*/

export default adminApi;
