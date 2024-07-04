import React from 'react';
import './AdminHome.css'; // Import the updated CSS file

const AdminHome = () => {
  return (
    <div className="admin-homepage">
      <div className="admin-home-header">
        <h1 className="admin-welcome-text">Welcome, Admin!</h1>
      </div>
      <div className="admin-content-wrapper">
        <div className="admin-left-content">
          <img
            src="https://www.esikkimtourism.in/wp-content/uploads/2019/03/temi-tea-gardennn-bnnr.jpg"
            alt="Admin"
            className="admin-photo"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}
          />
        </div>
        <div className="admin-right-content">
          <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>Tealio: Serving the Society</h2>
          <p>
            Tealio is committed to providing high-quality teas while promoting sustainability
            and supporting local communities. Through our partnerships and initiatives, we strive
            to make a positive impact on society and the environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
