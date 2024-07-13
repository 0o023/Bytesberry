import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const StockForm = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const { stockId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // State for variant editing
  const paramProductId = location.state?.productId;
  const paramVariantName = location.state?.variantName;
  const [successMessage, setSuccessMessage] = useState('');

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
    if (selectedProductId) {
      setFilteredVariants(variants.filter(variant => variant.product_id === selectedProductId));
    } else {
      setFilteredVariants([]);
    }
  }, [selectedProductId, variants]);

  // Fetch stock details if in edit mode
  useEffect(() => {
    if (stockId) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_stock/${stockId}`);
          const stock = response.data;
          setSelectedProductId(stock.product_id);
          setSelectedVariantId(stock.size_variety_id);
          setStockQuantity(stock.stock_quantity);
        } catch (error) {
          console.error('Error fetching stock:', error.response ? error.response.data : error.message);
          toast.error('Error fetching stock.');
        }
      };

      fetchStock();
    }
  }, [stockId]);

  // Handle product change
  const handleProductChange = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);
    setSelectedVariantId(''); // Reset variant selection when product changes
    // Filter variants based on selected product
    setFilteredVariants(variants.filter(variant => variant.product_id === productId));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId || !selectedVariantId || !stockQuantity) {
      toast.error('Please fill in all fields.');
      return;
    }

    const stockData = {
      product_id: selectedProductId,
      size_variety_id: selectedVariantId,
      stock_quantity: stockQuantity,
    };

    try {
      let response;
      if (stockId) {
        console.log('Updating stock:', stockData);
        response = await axios.put(`http://localhost:5000/product_stock/${stockId}`, stockData, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        console.log('Adding stock:', stockData);
        response = await axios.post('http://localhost:5000/product_stock', stockData, {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (response.data) {
        setSuccessMessage(stockId ? 'Stock successfully updated!' : 'Stock successfully added!');
        toast.success(stockId ? 'Stock successfully updated!' : 'Stock successfully added!');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/inventory');
        }, 2000);
      } else {
        toast.error(`Failed to ${stockId ? 'update' : 'add'} stock.`);
      }
    } catch (error) {
      console.error(`Error ${stockId ? 'updating' : 'adding'} stock:`, error.response ? error.response.data : error.message);
      toast.error(`Error ${stockId ? 'updating' : 'adding'} stock.`);
    }
  };

  return (
    <div className="content">
      <h2>{stockId ? 'Edit Stock' : 'Add Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedProductId}
          onChange={handleProductChange}
          disabled={paramProductId && paramVariantName} // Disable during edit if paramProductId and paramVariantName exist
        >
          <option value="" disabled>Select Product</option>
          {products.map((product) => (
            <option key={product.product_id} value={product.product_id}>
              {product.product_name}
            </option>
          ))}
        </select>
        <select
          value={selectedVariantId}
          onChange={(e) => setSelectedVariantId(e.target.value)}
          disabled={!selectedProductId || paramProductId && paramVariantName} // Disable during edit if no selected product or if editing
        >
          <option value="" disabled>Select Variant</option>
          {filteredVariants.map((variant) => (
            <option key={variant.size_variety_id} value={variant.size_variety_id}>
              {variant.size_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Stock Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <button type="submit">
          {stockId ? 'Update' : 'Add'} Stock
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default StockForm;
