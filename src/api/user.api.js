// import axios from "axios";

// const userApi = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// userApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default userApi;
// src/services/userApi.js
import axios from "axios";

const base = import.meta.env.VITE_API_BASE_URL;

const userApi = axios.create({
  baseURL: base.endsWith("/api") ? base : `${base}/api`,
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userApi;
