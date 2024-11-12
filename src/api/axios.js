import axios from "axios";

const instance = axios.create({
  baseURL: "http://streamapp2-env.eba-jqkp2xdu.us-east-2.elasticbeanstalk.com/api/",
  headers: {
    "Content-Type": "application/json",
    "connection": "keep-alive",
    "accept": "text/plain",
  },
});

// Centralized error handling function
const handleErrors = (error, endpoint) => {
  console.error(`Error with request to ${endpoint}:`, error);

  if (error.response) {
    switch (error.response.status) {
      case 401:
        throw new Error("Unauthorized access. Please log in again.");
      case 403:
        throw new Error("Forbidden access. You do not have permission.");
      case 404:
        throw new Error("Resource not found. Please check the URL.");
      case 413:
        const serverLimit = error.response.headers['content-length'] || 'unknown';
        throw new Error(`File is too large. Server limit: ${serverLimit} bytes. Please contact the server administrator.`);
      default:
        throw new Error(`An error occurred: ${error.response.status} - ${error.response.statusText}`);
    }
  } else if (error.request) {
    throw new Error('No response received from server. Please check your network connection.');
  } else {
    throw new Error(`Request setup error: ${error.message}`);
  }
};

// Request interceptor to add token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Access token from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(error);
  }
);

// Reusable request methods
const apiRequest = async (method, endpoint, data, config = {}) => {
  try {
    const response = await instance[method](endpoint, data, config);
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

export const get = (endpoint, config = {}) => apiRequest('get', endpoint, null, config);
export const post = (endpoint, data, config = {}) => apiRequest('post', endpoint, data, config);
export const put = (endpoint, data, config = {}) => apiRequest('put', endpoint, data, config);
export const patch = (endpoint, data, config = {}) => apiRequest('patch', endpoint, data, config);
export const deleteRequest = (endpoint, config = {}) => apiRequest('delete', endpoint, null, config);

// Function to get the token and userId
export const getAuthData = () => {
  const token = localStorage.getItem('token'); // Retrieve token from local storage
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  if (!userId) {
    console.error("User ID not found. Please log in again.");
  }

  return { token, userId }; // Return both token and userId
};

export default instance;
