import React, { useState } from 'react';
import ProductDetails from './ProductDetails';
import ProductInventory from './ProductInventory';
import ProductPrice from './ProductPrice';


const App = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  return (
    <div className="app-container">
      <h1>Admin Dashboard</h1>

      <div className="section">
        <button onClick={() => setShowDetails(!showDetails)} className="toggle-button">
          Product Details
        </button>
        {showDetails && <ProductDetails />}
      </div>

      <div className="section">
        <button onClick={() => setShowInventory(!showInventory)} className="toggle-button">
          Product Inventory
        </button>
        {showInventory && <ProductInventory />}
      </div>

      <div className="section">
        <button onClick={() => setShowPrice(!showPrice)} className="toggle-button">
          Product Price
        </button>
        {showPrice && <ProductPrice />}
      </div>
    </div>
  );
};

export default Dashboard;
