import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar'; // Ensure the path is correct
import Footer from './footer'; // Ensure the path is correct
import './OrderDetails.css'; // Import the OrderDetails CSS file

function OrderDetails() {

  // Assume `orders` is an array containing order details. If it's empty, no orders have been made.
  const [orders, setOrders] = useState([
    
    {
      id: 1024,
      productName: 'Tealio Tea chai patti',
      productImage: 'https://m.media-amazon.com/images/I/41LR5-IXEzL.jpg', // Replace with your image path
      orderDate: '2024-08-21',
      customerName: 'Abishek Pradhan',
      orderAmount: '1200/-',
      orderStatus: 'Initiated',
      paymentStatus: 'Completed',
      paymentMode: 'COD',
    },
    {
      id: 9999,
      productName: 'Kalimpong Special Chai Patti',
      productImage: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/tea/n/d/7/2502-chai-patti-2-pouch-regular-tea-om-manglam-leaves-original-imagz4weuc48juhg.jpeg?q=90&crop=false', // Replace with your second image path
      orderDate: '2024-02-17',
      customerName: 'Jordi Singh',
      orderAmount: '4533/-',
      orderStatus: 'Initiated',
      paymentStatus: 'Completed',
      paymentMode: 'COD',
    },
    // Add more orders as needed
    {
      id: 5671,
      productName: 'Darjeeling  Chai Patti',
      productImage: 'https://rukminim2.flixcart.com/image/850/1000/k2arbm80/tea/v/z/c/250-premium-darjeeling-tea-orthodox-leaf-250-gm-green-tea-original-imafhzm6mgtrucax.jpeg?q=90&crop=false', // Replace with your second image path
      orderDate: '2024-08-27',
      customerName: 'Immanuel Bahing Rai',
      orderAmount: '1533/-',
      orderStatus: 'Initiated',
      paymentStatus: 'Completed',
      paymentMode: 'COD',
    },
    
  ]);
  
  return (
    // creates a container and content area for the order details 
    //conditional rendering 
    <div className="App order-details-page">
      <Navbar />
      <div className="order-details-container"> 
        <div className="order-details-content">
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
                Looks like you have no orders yet !! <span role="img" aria-label="sad face">😞</span>
              </h1>
            </div>
          ) : (
            <>
              <h1 className="order-list-heading">Order List</h1>
              <div className="order-list">
                {orders.map((order, index) => (
                  <Link to={`/order-details/${order.id}`} key={index} className="order-item">
                    <div className="order-image">
                      <img src={order.productImage} alt={order.productName} />
                    </div>
                    <div className="order-details">
                      <p className="product-name"><strong>{order.productName}</strong></p>
                      <p>Order number: {order.id}, Order Date: {order.orderDate}</p>
                      <p>Customer Name: {order.customerName}</p>
                      <p>Order amount: {order.orderAmount}, Order Status: {order.orderStatus}</p>
                      <p>Payment Status: {order.paymentStatus}, Payment mode: {order.paymentMode}</p>
                    </div>
                    <div className="arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-400"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="order-details-footer" />
    </div>
  );
}

export default OrderDetails;
