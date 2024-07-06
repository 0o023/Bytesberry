import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css'; // Import the CSS file

const AdminNavbar = ({ onTablesClick }) => {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 w-full bg-ft shadow-md flex justify-between items-center z-50 transition-all duration-300 ${isShrunk ? 'p-2' : 'p-4'}`}>
      <div className="flex items-center">
        <img 
          src="https://t3.ftcdn.net/jpg/04/52/42/04/360_F_452420456_98FldcaQpEz84hGfz3DjYB5GIUYqmEoH.jpg" 
          alt="Tealio Logo"
          className={`transition-all duration-500 ${isShrunk ? 'h-12' : 'h-20'}`} 
        />
        <Link to="/" className="ml-4 text-white">Home</Link>
        <Link to="/admin-login" className="ml-4 text-white">Login</Link>
      </div>
      <div className="navbar-links">
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/order-details" className="nav-link">Orders</Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
