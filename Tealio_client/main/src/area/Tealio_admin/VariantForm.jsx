import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const VariantForm = ({ addVariant, updateVariant }) => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [variantName, setVariantName] = useState('');
  const [productName, setProductName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { productId: paramProductId, variantName: paramVariantName } = useParams();

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

    fetchProducts();
  }, []);

  useEffect(() => {
    if (paramProductId && paramVariantName) {
      const existingVariant = products
        .flatMap((product) => product.variants || [])
        .find((variant) => variant.productId === paramProductId && variant.name === paramVariantName);

      if (existingVariant) {
        setProductId(existingVariant.productId);
        setVariantName(existingVariant.name);
        const selectedProduct = products.find(product => product.product_id === existingVariant.productId);
        setProductName(selectedProduct ? selectedProduct.product_name : 'Unknown Product');
      }
    }
  }, [paramProductId, paramVariantName, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !variantName) {
      toast.error('Please fill in all fields.');
      return;
    }

    const variant = {
      product_id: productId,
      size_name: variantName
    };

    console.log('Submitting variant:', variant); // Debug: log the variant being submitted

    try {
      if (paramProductId && paramVariantName) {
        await axios.put(`http://localhost:3000/product_variety_size/${paramProductId}`, variant, {
          headers: { 'Content-Type': 'application/json' }
        });
        updateVariant(variant);
        setSuccessMessage('Variant successfully updated!');
        toast.success('Variant successfully updated!');
      } else {
        await axios.post('http://localhost:3000/product_variety_size', variant, {
          headers: { 'Content-Type': 'application/json' }
        });
        addVariant(variant);
        setSuccessMessage('Variant successfully added!');
        toast.success('Variant successfully added!');
      }
    } catch (error) {
      console.error('Error saving the variant:', error);
      toast.error('Error saving the variant.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      navigate('/variants');
    }, 3000);
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setProductId(selectedProductId);
    const selectedProduct = products.find(product => product.product_id === selectedProductId);
    setProductName(selectedProduct ? selectedProduct.product_name : 'Unknown Product');
  };

  return (
    <div className="content">
      <h2>{paramProductId && paramVariantName ? 'Edit Variant' : 'Add Variant'}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={productId}
          onChange={handleProductChange}
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_name}
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
