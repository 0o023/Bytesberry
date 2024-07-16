import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ProductPriceForm = ({ addPrice, updatePrice }) => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const { priceId } = useParams(); // Get priceId from URL params
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_generic_details');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        toast.error('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  // Fetch all variants
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_variety_size');
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error.response ? error.response.data : error.message);
        toast.error('Error fetching variants.');
      }
    };

    fetchVariants();
  }, []);

  // Filter variants based on selected product
  useEffect(() => {
    if (selectedProduct) {
      const filtered = variants.filter(variant => variant.product_id === selectedProduct);
      setFilteredVariants(filtered);
    } else {
      setFilteredVariants([]);
      setSelectedVariantId('');
    }
  }, [selectedProduct, variants]);

  // Fetch existing price details if editing
  useEffect(() => {
    if (priceId) {
      const fetchPrice = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_price/${priceId}`);
          const { product_id, size_variety_id, price, discount_percentage } = response.data;
          setSelectedProduct(product_id);
          setSelectedVariantId(size_variety_id);
          setPrice(price);
          setDiscount(discount_percentage);
        } catch (error) {
          console.error('Error fetching price details:', error.response ? error.response.data : error.message);
          toast.error('Error fetching price details.');
        }
      };

      fetchPrice();
    }
  }, [priceId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedProduct || !selectedVariantId || price === '' || discount === '') {
      toast.error('Please select a product, variant, and enter a price and discount.');
      return;
    }
  
    const priceData = {
      product_id: selectedProduct,
      size_variety_id: selectedVariantId,
      price: parseFloat(price),
      discount_percentage: parseFloat(discount),
    };
  
    try {
      if (priceId) {
        await axios.put(`http://localhost:5000/product_price/${priceId}`, priceData);
        toast.success('Price updated successfully.');
        updatePrice(priceData);
      } else {
        await axios.post('http://localhost:5000/product_price', priceData);
        toast.success('Price added successfully.');
        addPrice(priceData);
      }
  
      navigate('/price');
    } catch (error) {
      console.error('Error saving price:', error.response ? error.response.data : error.message);
      toast.error('Error saving price.');
    }
  };
  
  return (
    <div className="product-price-form">
      <h2>{priceId ? 'Edit Price' : 'Add New Price'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="form-select"
            disabled={!!priceId} // Disable dropdown if editing
          >
            <option value="" disabled>Select Product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </label>

        {selectedProduct && (
          <label>
            Variant:
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              className="form-select"
              disabled={!!priceId} // Disable dropdown if editing
            >
              <option value="" disabled>Select Variant</option>
              {filteredVariants.map((variant) => (
                <option key={variant.size_variety_id} value={variant.size_variety_id}>
                  {variant.size_name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label>
          Price:
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </label>

        <label>
          Discount Percentage:
          <input
            type="text"
            placeholder="Discount Percentage"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="form-input"
          />
        </label>

        <button type="submit" className="form-button">
          {priceId ? 'Update' : 'Add'}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default ProductPriceForm;