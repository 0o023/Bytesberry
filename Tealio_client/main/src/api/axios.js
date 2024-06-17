import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Update the URL as per your backend API URL
});

export default instance;