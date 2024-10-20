import { post } from './axios';

// Auth Service
const AuthService = {
    login: (data, authToken) => post('/api/Auth', data, authToken),
    register: (data, authToken) => post('/api/Auth/register', data, authToken),
};

export default AuthService;
