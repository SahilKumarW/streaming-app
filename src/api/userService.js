import { get, post, patch, put, deleteRequest } from './axios';
import { toast } from 'react-toastify';

const BASE_URL = '/Users';

// Function to get the token and userId
const getAuthData = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error("User ID not found. Please log in again.");
    }

    return { token, userId };
};

// Function to check if the user has admin access
const isAdmin = () => {
    const role = localStorage.getItem('role');
    if (role !== 'Admin') {
        console.error("Access denied: Only Admins can access this endpoint.");
        return false;
    }
    return true;
};

const UserService = {
    // Get all users if role is Admin
    getAllUsers: async () => {
        if (!isAdmin()) return Promise.reject("Access denied: Only Admins can access this endpoint.");

        const { token } = getAuthData();
        try {
            const response = await get(`${BASE_URL}/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response; // Return the fetched users
        } catch (error) {
            console.error("Error fetching users:", error);
            return Promise.reject("Error fetching users. Please try again later.");
        }
    },

    // Get user by ID if role is Admin
    getUserById: async (userId) => {
        if (!isAdmin()) return Promise.reject("Access denied: Only Admins can access this endpoint.");

        const { token } = getAuthData();
        try {
            const response = await get(`${BASE_URL}/get-user-by-id/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response; // Return the fetched user
        } catch (error) {
            console.error("Error fetching user:", error);
            return Promise.reject("User not found.");
        }
    },

    // Update user if role is Admin
    updateUser: async (user) => {
        if (!isAdmin()) return Promise.reject("Access denied: Only Admins can access this endpoint.");

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authorization token is missing.');
            return Promise.reject('Authorization token is missing.');
        }

        try {
            // Perform the update
            const response = await put(`${BASE_URL}/update-user`, user, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': 'text/plain',
                },
            });

            // Show a success toast notification
            toast.success("User updated successfully!", {
                position: "top-right", // Positioning the toast to the top right
                autoClose: 5000, // Duration for auto-close (in ms)
            });

            return response.data; // Return updated user data
        } catch (error) {
            console.error('Error updating user:', error);

            // Show an error toast notification
            toast.error("Error updating user. Please try again later.", {
                position: "top-right",
                autoClose: 5000,
            });

            return Promise.reject('Error updating user. Please try again later.');
        }
    },

    // Add user if role is Admin
    addUser: async (user) => {
        if (!isAdmin()) return Promise.reject("Access denied: Only Admins can access this endpoint.");

        const { token } = getAuthData();
        try {
            const response = await post(`${BASE_URL}/add-user`, user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response; // Return added user
        } catch (error) {
            console.error("Error adding user:", error);
            return Promise.reject("Error adding user. Please try again later.");
        }
    },

    // Delete user if role is Admin
    deleteUser: async (userId) => {
        if (!isAdmin()) return Promise.reject("Access denied: Only Admins can access this endpoint.");

        const { token } = getAuthData();
        try {
            const response = await deleteRequest(`${BASE_URL}/delete-user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response; // Return confirmation of deletion
        } catch (error) {
            console.error("Error deleting user:", error);
            return Promise.reject("Error deleting user. Please try again later.");
        }
    },
};

export default UserService;
