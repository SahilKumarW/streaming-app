import { get, post, patch, deleteRequest } from './axios';

const BASE_URL = '/Users';

// Function to get the token and userId
const getAuthData = () => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

    if (!userId) {
        console.error("User ID not found. Please log in again.");
    }

    return { token, userId }; // Return both token and userId
};

// UserService with updated endpoint functions
const UserService = {
    // Get all users
    getAllUsers: async () => {
        const { token } = getAuthData(); // Retrieve token
        if (!token) return;

        try {
            return await get(`${BASE_URL}/get-all-users`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error; // Re-throw to handle in the calling component
        }
    },

    // Get user by ID
    getUserById: async (userId) => {
        return await get(`${BASE_URL}/get-user-by-id/${userId}`);
    },

    // Update user
    updateUser: async (user) => {
        return await patch(`${BASE_URL}/update-user`, user);
    },

    // Add user
    addUser: async (user) => {
        return await post(`${BASE_URL}/add-user`, user);
    },

    // Delete user
    deleteUser: async (userId) => {
        return await deleteRequest(`${BASE_URL}/delete-user/${userId}`);
    },
};

export default UserService;