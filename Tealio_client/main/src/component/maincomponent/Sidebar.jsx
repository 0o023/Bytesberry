// Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/product-description" className="dashboard-btn product-description">
                Product Description
            </Link>
            <Link to="/product-variance" className="dashboard-btn product-variance">
                Product Variance
            </Link>
            <Link to="/product-inventory" className="dashboard-btn product-inventory">
                Product Inventory
            </Link>
            <Link to="/product-price" className="dashboard-btn product-price">
                Product Price
            </Link>
        </div>
    );
};

export default Sidebar;
