/*import React, { useState, useEffect } from 'react';
import { getOrders, deleteOrders } from '../API/orders.api';
import OrderItem from './OrderItem';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        console.log('Orders fetched:', response.data); // Debug: Log fetched orders
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await deleteOrders(orderId);
      setOrders(orders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Order List</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Total Price</th>
                <th className="py-3 px-6 text-left">Date Ordered</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <OrderItem key={order.order_id} order={order} onDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
*/