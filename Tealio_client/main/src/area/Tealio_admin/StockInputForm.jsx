import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const StockInputForm = ({ products, updateProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [stock, setStock] = useState(product ? product.stock : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert stock to a number or null if empty
    const updatedStock = stock.trim() === '' ? null : parseInt(stock, 10);
    
    updateProduct({ ...product, stock: updatedStock });
    navigate('/inventory');
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div>
      <h2>Update Stock for {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Stock:
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock quantity"
          />
        </label>
        <button type="submit">Update Stock</button>
      </form>
    </div>
  );
};

export default StockInputForm;
