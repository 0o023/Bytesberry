// src/services/productService.js

import axiosInstance from './axiosInstance';

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data; // Assuming API returns an array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data; // Assuming API returns a single product object
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data; // Assuming API returns the newly added product
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Add similar functions for updateProduct, deleteProduct, etc.
