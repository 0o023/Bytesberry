import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS file

const AdminNavbar = ({ onTablesClick }) => {
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <img
          src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg"
          alt="Tealio Logo"
          className="logo"
        />
      </div>
      <div className="navbar-links">
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/order-details" className="nav-link">Orders</Link> {/* Updated path */}
      </div>
    </nav>
  );
};

export default AdminNavbar;
