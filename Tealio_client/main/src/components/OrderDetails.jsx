import React, { useState } from 'react';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import './OrderDetails.css'; // Import the OrderDetails CSS file

function OrderDetails() {
  // Assume `orders` is an array containing order details. If it's empty, no orders have been made.
  const [orders, setOrders] = useState([
    {
      id: 1024,
      productName: 'Tealio Tea chai patti',
      productImage: 'https://m.media-amazon.com/images/I/71EVBqqnRhL._AC_UF1000,1000_QL80_.jpg', // Replace with your image path
      orderDate: '2024-08-21', customerName: 'Abishek Pradhan',
      orderAmount: '1200/-', orderStatus: 'Initiated',
      paymentStatus: 'Completed', paymentMode: 'COD',
    },
    // Add more orders as needed
  ]);

  return (
    <div className="App">
      <Navbar />
      <div className="order-details-container">
        <div className="order-details-content">
          <h1>Order Details</h1>
          {orders.length === 0 ? (
            <div className="empty-order">
              <div className="cart">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/019/787/018/non_2x/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png" 
                  alt="Empty Cart" 
                  className="cart-image" 
                />
                <div className="falling-items">
                  <div className="item">🎁</div>
                  <div className="item">🛍️</div>
                  <div className="item">🎁</div>
                  <div className="item">🛍️</div>
                </div>
              </div>
              <h1 className="no-orders-message">
                Looks like you have no orders yet <span role="img" aria-label="sad face">😞</span>
              </h1>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order, index) => (
                <div key={index} className="order-item">
                  <div className="order-image">
                    <img src={order.productImage} alt={order.productName} />
                  </div>
                  <div className="order-details">
                    <p className="product-name"><strong>{order.productName}</strong></p>
                    <p><strong>Order number:</strong> {order.id}</p>
                    <p><strong>Order Date:</strong> {order.orderDate}</p>
                    <p><strong>Customer Name:</strong> {order.customerName}</p>
                    <p><strong>Order amount:</strong> {order.orderAmount}</p>
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                    <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                    <p><strong>Payment mode:</strong> {order.paymentMode}</p>
                  </div>
                  <div className="view-details">
                    <button className="view-details-button">VIEW DETAILS</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="order-details-footer" />
    </div>
  );
}

export default OrderDetails;
