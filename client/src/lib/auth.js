// frontend/src/lib/auth.js
// src/lib/auth.js
import * as jwtDecode from "jwt-decode"; // ESM-compatible import

export const TOKEN_KEY = "token";

export const isAuthed = () => !!localStorage.getItem(TOKEN_KEY);

export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export const getUser = () => {
  const t = getToken();
  if (!t) return null;
  try {
    return jwtDecode.default(t); // use .default with ESM import
  } catch (e) {
    console.warn("Invalid token:", e);
    return null;
  }
};

export const authHeader = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};

export const logout = (navigate) => {
  clearToken();
  if (navigate) navigate("/login");
  else window.location.href = "/login";
};
