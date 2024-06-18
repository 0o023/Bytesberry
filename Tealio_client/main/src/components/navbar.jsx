/*
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img 
                    src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg" 
                    alt="Tealio Logo"
                    className="h-20" // Adjust the height as needed
                />
            </div>
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-gray-700">Home</Link></li>
                <li><Link to="/cart" className="text-gray-700">Cart 🛒</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the Navbar.css file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img 
          src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg" 
          alt="Tealio Logo"
          className="navbar-logo"
        />
      </div>
      <div className="navbar-right">
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/cart" className="navbar-link">Cart 🛒</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

