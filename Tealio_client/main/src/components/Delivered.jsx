import React from 'react';
import './Card.css';

function Delivered() {
  return (
    <div className="card">
      <img 
        src="https://www.clipartmax.com/png/middle/232-2322730_its-time-for-you-to-head-on-over-to-our-sign-up.png" 
        alt="Delivered" 
        className="card-image" 
      />
      <div className="card-content">
        <h2>Delivered</h2>
        <p>See delivered orders</p>
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
  );
}

export default Delivered;
