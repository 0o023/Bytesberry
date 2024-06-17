// src/components/OrderSummary.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderSummary = location.state?.orderSummary;

  console.log(orderSummary);
  useEffect(() => {
 

  if (!orderSummary) {
    return <div>No order details available.</div>;
  };
});

  return (
    <div className="p-10 bg-bgcolor min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-btgreen text-white text-center py-2">
          <h2 className="text-3xl font-bold">Order Summary</h2>
        </div>
        <div className="px-6 py-4 bg-green-100">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <div>Name: {orderSummary.firstName} {orderSummary.lastName}</div>
          <div>Shipping Address: {orderSummary.address}</div>
          <div>Payment Method: {orderSummary.paymentMethod ? 'Cash on Delivery' : 'None'}</div>
          <div>Total Amount: Rs {orderSummary.totalAmount.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;