// src/area/Tealio_admin/VariantForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VariantForm = ({ products, addVariant, updateVariant }) => {
  const [productId, setProductId] = useState('');
  const [variantName, setVariantName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { productId: paramProductId, variantName: paramVariantName } = useParams();

  useEffect(() => {
    if (paramProductId && paramVariantName) {
      // Find the variant to edit
      const existingVariant = products
        .flatMap((product) => product.variants || [])
        .find((variant) => variant.productId === paramProductId && variant.name === paramVariantName);

      if (existingVariant) {
        setProductId(existingVariant.productId);
        setVariantName(existingVariant.name);
      }
    }
  }, [paramProductId, paramVariantName, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId || !variantName) {
      alert('Please fill in all fields.');
      return;
    }

    const variant = { productId, name: variantName };

    if (paramProductId && paramVariantName) {
      updateVariant(variant);
      setSuccessMessage('Variant successfully updated!');
    } else {
      addVariant(variant);
      setSuccessMessage('Variant successfully added!');
    }

    // Clear success message and redirect back
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/variants'); // Redirect back to ProductVariants page
    }, 3000);
  };

  return (
    <div className="content">
      <h2>{paramProductId && paramVariantName ? 'Edit Variant' : 'Add Variant'}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Variant Name"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
        />
        <button type="submit">
          {paramProductId && paramVariantName ? 'Update Variant' : 'Add Variant'}
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default VariantForm;
