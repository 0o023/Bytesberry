import React from 'react';
import './Card.css';

function Shipping() {
  return (
    <div className="card">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGDKEOzSNQf30dPUoZrZDroquLEUsXDQ2XRt04SN5aIJMdnLoml1-Fi3KOCzxGINOVZs&usqp=CAU" 
        alt="Shipping" 
        className="card-image" 
      />
      <div className="card-content">
        <h2>Shipping</h2>
        <p>View your shipping details</p>
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

export default Shipping;
