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

const UserService = {
    // Get all users if role is Admin
    getAllUsers: async () => {
        const { token } = getAuthData();
        const role = localStorage.getItem('role');

        if (role !== 'Admin') {
            console.error("Access denied: Only Admins can access this endpoint.");
            return Promise.reject("Access denied: Only Admins can access this endpoint.");
        }

        try {
            return await get(`${BASE_URL}/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    // Get user by ID
    getUserById: async (userId) => {
        return await get(`${BASE_URL}/get-user-by-id/${userId}`);
    },

    // Update user
    updateUser: async (user) => {
        const { token } = getAuthData();
        return await patch(`${BASE_URL}/update-user/${user.id}`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Add user
    addUser: async (user) => {
        const { token } = getAuthData();
        return await post(`${BASE_URL}/add-user`, user, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    // Delete user
    deleteUser: async (userId) => {
        const { token } = getAuthData();
        return await deleteRequest(`${BASE_URL}/delete-user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default UserService;
