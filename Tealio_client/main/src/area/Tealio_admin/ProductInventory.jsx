import React from 'react';
import { Link } from 'react-router-dom';

const ProductInventory = ({ products }) => (
  <div className="content">
    <h2>Product Inventory</h2>
    {products.length === 0 ? (
      <p>No products available. Please add a product.</p>
    ) : (
      <>
        <Link to="/product-details">
          <button>Add Product</button>
        </Link>
        <table>
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Image (Base64)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.image ? product.image.substring(0, 10) : ''}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
);

export default ProductInventory;
