import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend's URL

export const addCart = async (item) => {
  return await axios.post(`${API_URL}/add_cart`, item);
};

export const getCart = async (id) => {
  return await axios.get(`${API_URL}/get_cart/${id}`);
};

export const getAllCart = async () => {
  return await axios.get(`${API_URL}/get_all_cart`);
};

export const deleteCart = async (id) => {
  return await axios.delete(`${API_URL}/delete_cart/${id}`);
};

export default axios.create({
  baseURL: API_URL,
});
