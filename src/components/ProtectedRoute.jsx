import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Helper function to check if the user is an admin
const isAdmin = () => {
    const user = localStorage.getItem('role'); // Get user data from localStorage
    return user?.role === "admin" || "Admin"; // Check if the role is admin
};

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!isAdmin()) {
        // If the user isn't an admin, redirect them to access-denied page
        return <Navigate to="/access-denied" state={{ from: location }} />;
    }

    return children; // Allow access if user is admin
};

export default ProtectedRoute;
