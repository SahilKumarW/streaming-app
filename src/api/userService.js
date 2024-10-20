// userService.js

import { get, post, put, deleteRequest } from './axios'; // Adjust the import based on your axios configuration

const UserService = {
    addUser: async (user, authToken) => {
        return await post('/api/Users/add-user', user, authToken); // POST new user
    },
    // Add other functions like getAllUsers, getUserById, updateUser, deleteUser
    getAllUsers: async (authToken) => {
        return await get('/api/Users/get-all-users', authToken);
    },
    getUserById: async (userId, authToken) => {
        return await get(`/api/Users/${userId}`, authToken);
    },
    updateUser: async (user, authToken) => {
        return await put(`/api/Users/update-user/${user.id}`, user, authToken);
    },
    deleteUser: async (userId, authToken) => {
        return await deleteRequest(`/api/Users/delete-user/${userId}`, authToken);
    },
};

export default UserService; // Ensure you are exporting the UserService object
