/*import React from 'react';

const OrderItem = ({ order, onDelete }) => {
  return (
    <tr className="bg-white hover:bg-gray-100 transition-colors duration-200">
      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{order.username}</td>
      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{order.status}</td>
      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">${parseFloat(order.total_price).toFixed(2)}</td>
      <td className="py-2 px-4 border-b border-gray-200 text-gray-700">{new Date(order.date_ordered).toLocaleDateString()}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        <button 
          onClick={() => onDelete(order.order_id)} 
          className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-red-500 hover:to-red-700 transition-all duration-300"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
*/