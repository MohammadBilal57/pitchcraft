// src/Components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Config/Firebase";

const PublicRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // ⏳ Wait until Firebase finishes checking authentication state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // 🚫 If user is logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ Otherwise, render the public page (SignIn / SignUp)
  return children;
};

export default PublicRoute;
