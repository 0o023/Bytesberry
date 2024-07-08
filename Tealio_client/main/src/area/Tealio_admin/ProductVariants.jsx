// src/area/Tealio_admin/ProductVariants.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProductVariants = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);

  // Fetch products and variants from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_generic_details');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error fetching products.');
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_variety_size');
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error);
        toast.error('Error fetching variants.');
      }
    };

    fetchProducts();
    fetchVariants();
  }, []);

  // Handle deletion of a variant
  const handleDeleteVariant = async (variant) => {
    if (window.confirm(`Are you sure you want to delete the variant "${variant.name}"?`)) {
      try {
        await axios.delete(`http://localhost:3000/product_variety_size/${variant.id}`);
        setVariants(variants.filter(v => v.id !== variant.id)); // Update the local state
        toast.success('Variant deleted successfully!');
      } catch (error) {
        console.error('Error deleting the variant:', error);
        toast.error('Error deleting the variant.');
      }
    }
  };

  // Helper function to get the product name by product ID
  const getProductName = (productId) => {
    const product = products.find((product) => product.product_id === productId);
    return product ? product.product_name : 'Unknown Product';
  };

  return (
    <div className="content">
      <h2>Product Variants</h2>
      <Link to="/variants/add">
        <button>Add Variant</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Product</th>
            <th>Variant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {variants.length > 0 ? (
            variants.map((variant, index) => (
              <tr key={variant.id}>
                <td>{index + 1}</td>
                <td>{getProductName(variant.productId)}</td>
                <td>{variant.name}</td>
                <td>
                  <Link to={`/variants/edit/${variant.productId}/${variant.name}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDeleteVariant(variant)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No variants available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductVariants;
