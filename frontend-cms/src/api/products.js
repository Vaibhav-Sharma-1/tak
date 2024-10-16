// src/api/products.js
import apiClient from './apiClient';


// Fetch products with the stored token (if protected route)
export const getProducts = async (page, limit) => {
  const { data } = await apiClient.get(`/products?page=${page}&limit=${limit}`);
  return data;

};


export const uploadimages = async (files) => {
  const { data } = await apiClient.post("/images/upload", files, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export const createProduct = async (product) => {
  const { data } = await apiClient.post('/products', product);
  return data;
}

export const getProduct = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}

export const updateProduct = async (id, product) => {
  const { data } = await apiClient.put(`/products/${id}`, product);
  return data;
}

export const deleteProduct = async (id) => {
  const { data } = await apiClient.delete(`/products/${id}`);
  return data;
}