import { post } from './axios';

// Auth Service
const AuthService = {
    login: async (data) => {
        try {
            const response = await post('/auth', data); // Ensure endpoint matches your API
            console.log("Response from login:", response.data);
            // if (response && response.apiCode === 0 && response.data.token) {
            //     localStorage.setItem('userName', response.data.name);
            //     localStorage.setItem('token', response.data.token);  // Store token in localStorage
            //     localStorage.setItem('userId', response.data.id); // Store UserId in localStorage
            // }
            return response;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');  // Remove token from localStorage
    },

    register: (data) => post('/auth/register', data), // Ensure the endpoint is correct
};

export default AuthService;
