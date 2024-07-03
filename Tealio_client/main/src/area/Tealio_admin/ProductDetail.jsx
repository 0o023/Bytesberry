import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ onDelete }) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/details/edit/${id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_generic_details');
        if (response.data) {
          setProducts(response.data);
        } else {
          setErrorMessage('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

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
                <button onClick={() => handleEdit(product.id)}>Edit</button>
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



/*// src/area/Tealio_admin/ProductDetails.js
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

export default ProductDetails;*/