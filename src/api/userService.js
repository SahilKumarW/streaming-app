import { get, post, patch, deleteRequest } from './axios';

const BASE_URL = '/Users';

// UserService with updated endpoint functions
const UserService = {
    // Get all users
    getAllUsers: async () => {
        return await get(`${BASE_URL}/get-all-users`);
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