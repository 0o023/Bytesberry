import axios from 'axios';

const API_URL ='http://localhost:5000';

export const addCart =async(item)=>{
    return await axios.post(`${API_URL}/add_cart`,item);
};

export const getCart =async(orderno)=>{
    return await axios.get(`${API_URL}/get_cart`,orderno);
};

export const deleteCart= async(orderno) => {
    return await axios.delete(`${API_URL}/delete_cart`,orderno);
};



export default axios.create({
    baseURL: API_URL,
});
  