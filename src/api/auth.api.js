import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

/* ================= ADD THIS INTERCEPTOR ================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
/* ======================================================= */

export const registerUser = async (data) => {
  const res = await API.post("/api/accounts/auth/register/", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/api/accounts/auth/login/", data);
  return res.data;
};

export const googleAuth = async (data) => {
  const res = await API.post("/api/accounts/auth/google/", data);
  return res.data;
};

export default API;
