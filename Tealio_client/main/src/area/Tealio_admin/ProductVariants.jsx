// src/area/Tealio_admin/ProductVariants.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductVariants = ({ products, variants, editVariant, deleteVariant }) => {
  const getProductName = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.name : 'Unknown Product';
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
          {variants.map((variant, index) => (
            <tr key={`${variant.productId}-${variant.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{getProductName(variant.productId)}</td>
              <td>{variant.name}</td>
              <td>
                <Link to={`/variants/edit/${variant.productId}/${variant.name}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteVariant(variant)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductVariants;
