// src/Components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/Firebase"; // ✅ Correct import

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // ⏳ Show a loader while Firebase checks auth status
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // 🔒 If user is not logged in, redirect to Sign In
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Otherwise, render the protected page (e.g., Dashboard)
  return children;
};

export default ProtectedRoute;
