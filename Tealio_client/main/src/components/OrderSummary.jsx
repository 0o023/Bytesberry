import React from 'react';
import { useLocation } from 'react-router-dom';

function OrderSummary() {
  const location = useLocation();
  const formData = location.state || {}; // Ensure formData has a default value

  // Destructure formData with default values
  const {
    orderNumber = '',
    firstName = '',
    lastName = '',
    email = '',
    address = '',
    apartment = '',
    pinCode = '',
    paymentMethod = false,
    totalAmount = 0
  } = formData;

  return (
    <div className="p-12 bg-bgcolor min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-btgreen text-white text-center py-2">
          <h2 className="text-3xl font-bold">Order Summary</h2>
        </div>

        <div className="px-6 py-4">
          <p><strong>Order Number:</strong> {orderNumber}</p>
          <p><strong>Name:</strong> {firstName} {lastName}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Address:</strong> {address}, {apartment}</p>
          <p><strong>PIN Code:</strong> {pinCode}</p>
          <p><strong>Payment Method:</strong> {paymentMethod ? 'Cash On Delivery' : 'Not Selected'}</p>
          <p><strong>Total Amount:</strong> Rs {totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
