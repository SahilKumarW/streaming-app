import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const isAdmin = () => {
    const role = localStorage.getItem('role');
    return role === 'Admin';
};

const PrivateRoute = ({ element: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            element={isAdmin() ? <Component /> : (
                <>
                    <div className="bg-black text-white min-h-screen flex justify-center items-center">
                        <p className="text-xl">Access Denied: Only Admins can access this endpoint.</p>
                    </div>
                    {toast.error("Access denied: Only admins can access the dashboard.")}
                    {/* Redirect to home or login page */}
                    <Navigate to="/home" />
                </>
            )}
        />
    );
};

export default PrivateRoute;
