// src/api/auth.js
import Cookies from 'js-cookie';
import { setAuthToken } from '../utils/authToken';
import apiClient from './apiClient';


// Register user
export const register = async (userData) => {
  const { data } = await apiClient.post('/users/register', userData);
  return data;
};

// Login user
export const login = async (userData) => {
  const { data } = await apiClient.post('/users/login', userData);
  setAuthToken(data.token);
  return data;
};

// Logout user
export const logout = () => {
  Cookies.remove('token');
};
