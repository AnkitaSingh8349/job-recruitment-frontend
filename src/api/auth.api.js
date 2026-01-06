import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

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
