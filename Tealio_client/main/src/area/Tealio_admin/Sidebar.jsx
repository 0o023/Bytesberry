import React from 'react';
import { Link } from 'react-router-dom';

// Inline styles
const sidebarStyles = {
  container: {
    backgroundColor: '#fefded',
    color: '#333',
    width: '370px',
    minHeight: '100vh',
    padding: '16px',
    boxSizing: 'border-box',
    position: 'fixed', // Fixed position to keep it in place
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure it's on top
  },
  header: {
    backgroundColor: '#F2F3F4',
    width: '100%',
    padding: '16px',
    marginBottom: '18px',
    boxSizing: 'border-box',
    borderBottom: '2px solid #ccc', // Adding a border to define the header area
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    margin: 0, // Remove default margin
  },
  menu: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '35px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '22px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '21px',
    transition: 'text-decoration 0.3s', // Smooth transition for hover effect
  },
  linkHover: {
    textDecoration: 'underline',
  },
  submenu: {
    marginLeft: '16px',
  },
};

const Sidebar = () => {
  return (
    <div style={sidebarStyles.container}>
      <div style={sidebarStyles.header}>
        <h2 style={sidebarStyles.title}>Tealio</h2>
      </div>
      <h5 style={sidebarStyles.menu}>MENU</h5>
      <ul style={{ padding: 0, listStyleType: 'none' }}>
        <li style={sidebarStyles.item}>
          <Link 
            to="/" 
            style={sidebarStyles.link}
            onMouseOver={e => e.target.style.textDecoration = sidebarStyles.linkHover.textDecoration}
            onMouseOut={e => e.target.style.textDecoration = 'none'}
          >
            Home
          </Link>
        </li>
        <li style={sidebarStyles.item}>
          <span style={sidebarStyles.link}>Products</span>
        </li>
        <ul style={sidebarStyles.submenu}>
          <li style={sidebarStyles.item}>
            <Link 
              to="/details" 
              style={sidebarStyles.link}
              onMouseOver={e => e.target.style.textDecoration = sidebarStyles.linkHover.textDecoration}
              onMouseOut={e => e.target.style.textDecoration = 'none'}
            >
              Product Details
            </Link>
          </li>
          
          <li style={sidebarStyles.item}>
            <Link 
              to="/variants" 
              style={sidebarStyles.link}
              onMouseOver={e => e.target.style.textDecoration = sidebarStyles.linkHover.textDecoration}
              onMouseOut={e => e.target.style.textDecoration = 'none'}
            >
              Product Variants
            </Link>
          </li>
          <li style={sidebarStyles.item}>
            <Link 
              to="/inventory" 
              style={sidebarStyles.link}
              onMouseOver={e => e.target.style.textDecoration = sidebarStyles.linkHover.textDecoration}
              onMouseOut={e => e.target.style.textDecoration = 'none'}
            >
              Product Inventory
            </Link>
          </li>
          <li style={sidebarStyles.item}>
            <Link 
              to="/price" 
              style={sidebarStyles.link}
              onMouseOver={e => e.target.style.textDecoration = sidebarStyles.linkHover.textDecoration}
              onMouseOut={e => e.target.style.textDecoration = 'none'}
            >
              Product Price
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default Sidebar;
