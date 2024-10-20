import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleErrors = (error, endpoint) => {
  console.error(`Error with request to ${endpoint}:`, error);
  if (error.response) {
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response.data);
    console.error('Error response headers:', error.response.headers);
    if (error.response.status === 413) {
      const serverLimit = error.response.headers['content-length'] || 'unknown';
      throw new Error(`File is too large. Server limit: ${serverLimit} bytes. Please contact the server administrator.`);
    }
    throw error.response;
  } else if (error.request) {
    console.error('Error request:', error.request);
    throw new Error('No response received from server');
  } else {
    console.error('Error message:', error.message);
    throw error;
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const event = new CustomEvent("unauthorized");
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const get = async (endpoint) => {
  try {
    const response = await instance.get(endpoint);
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

const post = async (endpoint, data, config = {}) => {
  try {
    const response = await instance.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

const put = async (endpoint, data, authToken) => {
  try {
    const response = await instance.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

const deleteRequest = async (url) => {
  try {
    console.log('DELETE request to:', url);
    const response = await instance.delete(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log('DELETE response:', response);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    handleErrors(error, url);
  }
};

const patch = async (endpoint, data) => {
  try {
    console.log('PATCH request to:', endpoint);
    console.log('PATCH data:', data);
    const response = await instance.patch(endpoint, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('PATCH response:', response);
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

export { instance, get, post, deleteRequest, put, patch };
