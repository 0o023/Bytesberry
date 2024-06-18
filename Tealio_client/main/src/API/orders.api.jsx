import axios from 'axios';

const API_URL = 'http://localhost:5000/place_order'; // Adjust the URL according to your backend server

export const placeOrder = async (order) => {
  return await axios.post(API_URL, order);
};

export const getOrders = async () => {
  return await axios.get(API_URL);
};

export const deleteOrders = async (orderId) => {
  return await axios.delete(`${API_URL}/${orderId}`);
};
