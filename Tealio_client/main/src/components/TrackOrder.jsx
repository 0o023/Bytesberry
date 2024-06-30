import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [trackingDetails, setTrackingDetails] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    const handleTrackOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/show_tracking_details/${orderId}`);
            setTrackingDetails(response.data);
            setError('');
        } catch (error) {
            setTrackingDetails(null);
            if (error.response) {
                console.error('Response error:', error.response.data);
                setError('Order not found');
            } else if (error.request) {
                console.error('Request error:', error.request);
                setError('No response from server');
            } else {
                console.error('Error', error.message);
                setError('An error occurred');
            }
            console.error('Error config:', error.config);
        }
    };

return (
<div className="min-h-screen flex flex-col items-center justify-start pt-12">
<div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full mb-12">
      <h1 className="text-2xl font-bold text-center mb-4" style={{ color: '#244d19' }}>Track Your Order</h1>
     <form className="space-y-4">
     <div className="flex flex-col">
    <label htmlFor="orderId" className="text-sm font-medium text-gray-700">Order Number</label>
     <input
     id="orderId"
     type="text"
     value={orderId}
     onChange={handleInputChange}
     placeholder="Enter your order no"
 className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-green-500"
 />
 </div>
 <button
  type="button"
     onClick={handleTrackOrder}
     className="bg-btgreen text-white py-2 px-4 rounded-md w-full"
>
    Track Order
      </button>
 </form>
{error && <p className="text-red-500 mt-4">{error}</p>}
</div>
{trackingDetails && (
<OrderDetails trackingDetails={trackingDetails} />
 )}
</div>
);
};

const OrderDetails = ({ trackingDetails }) => {
    return (
    <div className="bg-btgreen p-6 rounded-lg shadow-md w-full">
     <h2 className="text-xl text-center font-bold mb-4">ORDER DETAILS</h2>
     <div className="overflow-x-auto">
     <table className="min-w-full bg-white border border-gray-200">
     <thead>
        <tr className="bg-gray-50">
        <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Order Number</th>
         <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Order Status</th>
         <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">AWB Tracking No</th>
         <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Product Details</th>                    
  </tr>
</thead>
<tbody>
   <tr>
    <td className="py-2 px-4 border-b text-sm text-gray-600">{trackingDetails.order_no}</td>
       <td className="py-2 px-4 border-b text-sm text-gray-600">{trackingDetails.order_status}</td>
       <td className="py-2 px-4 border-b text-sm text-gray-600">{trackingDetails.awb_tracking_no}</td>
    <td className="py-2 px-4 border-b text-sm text-gray-600">
  {trackingDetails.product_details.map((product, index) => (
 <p key={index}>{`${product.name} x ${product.quantity}`}</p>
     ))}
 </td>
  </tr>
 </tbody>
 </table>
 </div>
  </div>
 );
};

export default TrackOrder;
