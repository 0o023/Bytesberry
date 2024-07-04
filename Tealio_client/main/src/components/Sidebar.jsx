import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file for Sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Tealio</h2>
      </div>
      <h5 className="sidebar-menu">MENU</h5>
      <ul>
        <li className="sidebar-item">
          <img src="https://img.icons8.com/material-outlined/24/000000/dashboard-layout.png" alt="Dashboard Icon" className="sidebar-icon" />
          <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        </li>
        <li className="sidebar-item">
          <img src="https://img.icons8.com/material-outlined/24/000000/shopping-cart.png" alt="Ecommerce Icon" className="sidebar-icon" />
          <span className="sidebar-link">Ecommerce</span>
          <img src="https://static.thenounproject.com/png/1666929-200.png" alt="Dropdown Arrow" className="sidebar-dropdown-icon" />
        </li>
        <ul className="sidebar-submenu">
          <li className="sidebar-subitem">
            <img src="https://img.icons8.com/material-outlined/24/000000/order-history.png" alt="Your Orders Icon" className="sidebar-icon" />
            <Link to="/order-details" className="sidebar-sublink">Your Orders</Link>
          </li>
          <li className="sidebar-subitem">
            <img src="https://img.icons8.com/material-outlined/24/000000/shipped.png" alt="Shipping Icon" className="sidebar-icon" />
            <Link to="/shipping" className="sidebar-sublink">Shipping</Link>
          </li>
          <li className="sidebar-subitem">
            <img src="https://img.icons8.com/material-outlined/24/000000/location-update.png" alt="Tracking Icon" className="sidebar-icon" />
            <Link to="/tracking" className="sidebar-sublink">Tracking</Link>
          </li>
          <li className="sidebar-subitem">
            <img src="https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/receive-delivery-send-box-4-512.png" alt="Delivered Icon" className="sidebar-icon sidebar-icon-large" />
            <Link to="/delivered" className="sidebar-sublink">Delivered</Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}

export default Sidebar;
