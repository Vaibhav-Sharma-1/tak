// src/api/apiClient.js
import axios from 'axios';
import { getAuthToken } from '../utils/authToken';

// Set base URL for API
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

// Intercept request to add Authorization header automatically if token is present
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});



export default apiClient;
