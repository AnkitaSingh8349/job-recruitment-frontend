// src/utils/auth.js

// ===============================
// Save token + user after login / register
// ===============================
export const saveAuth = (data) => {
  if (!data) return;

  if (data.access) {
    localStorage.setItem("access", data.access);
  }

  if (data.refresh) {
    localStorage.setItem("refresh", data.refresh);
  }

  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
};

// ===============================
// Get logged-in user
// ===============================
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ===============================
// Get access token
// ===============================
export const getAccessToken = () => {
  return localStorage.getItem("access");
};

// ===============================
// Check if user is logged in
// ===============================
export const isLoggedIn = () => {
  return !!getAccessToken();
};

// ===============================
// Check if logged-in user is admin
// ===============================
export const isAdmin = () => {
  const user = getUser();
  return user?.role === "admin";
};

// ===============================
// Logout user (clear all auth data)
// ===============================
export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};

// ===============================
// OPTIONAL: Clear all auth data (force logout)
// ===============================
export const clearAuth = () => {
  localStorage.clear();
};
