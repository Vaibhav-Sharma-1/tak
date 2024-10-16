// src/api/products.js
import apiClient from './apiClient';


// Fetch products with the stored token (if protected route)
export const getProducts = async (page, limit) => {
  const { data } = await apiClient.get(`/products?page=${page}&limit=${limit}`);
  return data;

};


export const getProduct = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}
