// src/area/Tealio_admin/ProductDetails.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetails = ({ products, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Product Details</h2>
      <Link to="/details/add">
        <button>Add Product</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                <Link to={`/details/edit/${product.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetails;
