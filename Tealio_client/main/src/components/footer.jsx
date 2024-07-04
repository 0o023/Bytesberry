import React from 'react';
import './Footer.css'; // Import the Footer.css file

const Footer = ({ hideLine, hideGallery }) => {
  return (
    <footer className={`footer ${hideLine ? 'no-line' : ''}`}>
      <div className="footer-content">
        {/* Gallery section removed */}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Tealio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
