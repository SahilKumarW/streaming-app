import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // Retrieve role from localStorage
    const location = useLocation();

    if (!token) {
        // If the user is not logged in, restrict all routes and redirect to login
        toast.error("Please log in first!");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (location.pathname.startsWith("/dashboard") && userRole !== "Admin") {
        // If logged in but not an admin, restrict dashboard access
        toast.error("Access denied. Admins only!");
        return <Navigate to="/access-denied" state={{ from: window.location.pathname }} />;
    }

    return children; // Allow access if checks pass
};

export default ProtectedRoute;
