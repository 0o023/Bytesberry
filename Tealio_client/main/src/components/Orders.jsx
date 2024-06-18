import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

function Orders() {
  return (
    <Link to="/order-details" className="card-link">
      <div className="card">
        <img 
          src="https://cdn5.vectorstock.com/i/1000x1000/85/69/complete-order-icon-in-blue-style-for-any-projects-vector-35418569.jpg" 
          alt="Orders" 
          className="card-image" 
        />
        <div className="card-content">
          <h2>Your Orders</h2>
          <p>Navigate Your Order Journey</p>
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
        </div>
      </div>
    </Link>
  );
}

export default Orders; 
