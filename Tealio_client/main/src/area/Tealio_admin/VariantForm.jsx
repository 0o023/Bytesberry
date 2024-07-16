
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
  const [variantId,setVariantId]=useState([]);
  const { productId: paramProductId, variantName: paramVariantName,variantId:paramVariantId } = useParams();


  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_generic_details');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  // Fetch existing variant for editing
  useEffect(() => {
    if (paramProductId && paramVariantName) {
      const fetchVariant = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_variety_size?productId=${paramProductId}`);
          const data = response.data;

          // Log the response to check its structure
          console.log('Response data:', data);

          // Check if data is an array and find the variant
          if (Array.isArray(data)) {
            const existingVariant = data.find((variant) => variant.size_name === paramVariantName);

            if (existingVariant) {
              setProductId(existingVariant.product_id);
              setVariantName(existingVariant.size_name);
              const selectedProduct = products.find(product => product.product_id === existingVariant.product_id);
              setProductName(selectedProduct ? selectedProduct.product_name : 'Unknown Product');
            } else {
              toast.error('Variant not found.');
            }
          } else {
            toast.error('Unexpected response format.');
          }
        } catch (error) {
          console.error('Error fetching variant:', error);
          toast.error('Error fetching variant.');
        }
      };

      fetchVariant();
    } else {
      // Reset state when adding a new variant
      setProductId('');
      setVariantName('');
      setProductName('');
    }
  }, [paramProductId, paramVariantName, products]);

  // Handle form submission
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
  
    try {
      if (paramProductId && paramVariantName) {
        console.log('Updating variant:', variant); // Log payload
        const response = await axios.put(`http://localhost:5000/product_variety_size/${paramVariantId}`, variant, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Update response:', response.data); // Log server response
  
        if (response.data) {
          updateVariant(variant);
          setSuccessMessage('Variant successfully updated!');
          toast.success('Variant successfully updated!');
        } else {
          toast.error('Failed to update variant.');
        }
      } else {
        console.log('Adding variant:', variant); // Log payload
        const response = await axios.post('http://localhost:5000/product_variety_size', variant, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log('Add response:', response.data); // Log server response
  
        if (response.data) {
          addVariant(variant);
          setSuccessMessage('Variant successfully added!');
          toast.success('Variant successfully added!');
        } else {
          toast.error('Failed to add variant.');
        }
      }
    } catch (error) {
      console.error('Error saving the variant:', error);
      toast.error('Error saving the variant.');
    }
  
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/variants');
    }, 2000);
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
          disabled={paramProductId && paramVariantName} // Disable dropdown during editing
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
          placeholder="Variant"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
        />
        <button type="submit">
          {paramProductId && paramVariantName ? 'Update' : 'Add'}
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default VariantForm;