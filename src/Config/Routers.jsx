// src/Router/Routers.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Dashboard from "../Pages/Dashboard";
import Homepage from "../Pages/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🏠 Public Homepage (always accessible) */}
        <Route path="/" element={<Homepage />} />

        {/* 🧭 Public routes — accessible only if logged OUT */}
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        {/* 🔒 Protected routes — accessible only if logged IN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🚫 Optional: Catch-all route for unknown paths */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "20%" }}>
              404 – Page Not Found
            </h2>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
