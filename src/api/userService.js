// userService.js

import { get, post, patch, deleteRequest } from './axios'; // Change 'put' to 'patch'

const BASE_URL = 'http://localhost:3001/users';

const UserService = {
    addUser: async (user) => {
        return await post(BASE_URL, user);
    },
    // Add other functions like getAllUsers, getUserById, updateUser, deleteUser
    getAllUsers: async () => {
        return await get(BASE_URL);
    },
    getUserById: async (userId) => {
        return await get(`${BASE_URL}/${userId}`);
    },
    updateUser: async (user) => {
        console.log('Updating user:', user);
        console.log('Request URL:', `${BASE_URL}/${user.id}`);
        return await patch(`${BASE_URL}/${user.id}`, user);
    },
    deleteUser: async (userId) => {
        console.log(`Attempting to delete user with ID: ${userId}`);
        try {
            const response = await deleteRequest(`${BASE_URL}/${userId}`);
            console.log(`Delete response for user ${userId}:`, response);
            return response;
        } catch (error) {
            console.error(`Error deleting user with ID ${userId}:`, error);
            throw error;
        }
    },
};

export default UserService; // Ensure you are exporting the UserService object
