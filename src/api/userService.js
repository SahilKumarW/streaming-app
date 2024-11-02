import { get, post, patch, deleteRequest } from './axios';

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

        const { token } = getAuthData();
        try {
            const response = await patch(`${BASE_URL}/update-user/${user.id}`, user, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response; // Return updated user
        } catch (error) {
            console.error("Error updating user:", error);
            return Promise.reject("Error updating user. Please try again later.");
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
