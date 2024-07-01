// src/services/axiosInstance.js

import axios from 'axios';

const baseURL = 'https://api.example.com'; // Replace with your API base URL

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
