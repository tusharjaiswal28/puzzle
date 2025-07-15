import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    // If not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected component
    return children;
};

export default ProtectedRoute;
