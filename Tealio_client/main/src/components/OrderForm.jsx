/*import React, { useState } from 'react';
import { placeOrder } from '../API/orders.api';

const OrderForm = () => {
  const [order, setOrder] = useState({
    username: '',
    status: '',
    total_price: '',
    date_ordered: ''
  });

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeOrder(order);
      alert('Order placed successfully!');
      setOrder({ username: '', status: '', total_price: '', date_ordered: '' });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-md bg-white">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="username">Username</label>
        <input 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-black" 
          name="username" 
          value={order.username} 
          onChange={handleChange} 
          placeholder="Username" 
          required 
          style={{ backgroundColor: '#f0f8ff' }} // Light blue background
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">Status</label>
        <input 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-black" 
          name="status" 
          value={order.status} 
          onChange={handleChange} 
          placeholder="Status" 
          required 
          style={{ backgroundColor: '#f5fffa' }} // Light mint background
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="total_price">Total Price</label>
        <input 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-black" 
          name="total_price" 
          value={order.total_price} 
          onChange={handleChange} 
          placeholder="Total Price" 
          type="number" 
          required 
          style={{ backgroundColor: '#fffacd' }} // Light yellow background
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="date_ordered">Date Ordered</label>
        <input 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-black" 
          name="date_ordered" 
          value={order.date_ordered} 
          onChange={handleChange} 
          placeholder="Date Ordered" 
          type="date" 
          required 
          style={{ backgroundColor: '#ffe4e1' }} // Light pink background
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
*/
