// src/api/products.js
import apiClient from './apiClient';


// Fetch products with the stored token (if protected route)
export const getUserData = async () => {
  const { data } = await apiClient.get(`/users/profile`);
  return data;

};