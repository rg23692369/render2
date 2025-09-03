import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import DashboardUser from "./pages/DashboardUser.jsx";
import DashboardAstrologer from "./pages/DashboardAstrologer.jsx";
import { isAuthed, getUser } from "./lib/auth.js";

import "./styles.css";

// Guarded route
function ProtectedRoute({ children, role }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  const user = getUser();
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return children;
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute role="user">
            <DashboardUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/astrologer"
        element={
          <ProtectedRoute role="astrologer">
            <DashboardAstrologer />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
