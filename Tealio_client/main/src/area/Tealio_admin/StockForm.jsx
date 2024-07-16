import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './StockForm.css'; // Import the CSS file for styling

const StockForm = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const { stock_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentStock = location.state?.currentStock || '';

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

  // Fetch variants
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_variety_size');
        setVariants(response.data);
        console.log('Fetched Variants:', response.data); // Debugging statement
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
      const filtered = variants.filter(variant => variant.product_id === selectedProductId);
      setFilteredVariants(filtered);
      console.log('Filtered Variants:', filtered); // Debugging statement
    } else {
      setFilteredVariants([]);
    }
  }, [selectedProductId, variants]);

  // Fetch stock for editing
  useEffect(() => {
    if (stock_id) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_stock/${stock_id}`);
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
  }, [stock_id]);

  // Set stock quantity for current stock
  useEffect(() => {
    if (currentStock) {
      setStockQuantity(currentStock);
    }
  }, [currentStock]);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);
    setSelectedVariantId('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId || !selectedVariantId || !stockQuantity) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const stockData = {
      product_id: selectedProductId,
      size_variety_id: selectedVariantId,
      stock_quantity: stockQuantity
    };

    try {
      if (stock_id) {
        // Update stock
        await axios.put(`http://localhost:5000/product_stock/${stock_id}`, stockData);
      } else {
        // Check if stock already exists
        const checkResponse = await axios.post('http://localhost:5000/product_stock/check', stockData);
        if (checkResponse.data.exists) {
          setErrorMessage('Stock already exists for the selected product and variant.');
          return;
        }
        // Add new stock
        await axios.post('http://localhost:5000/product_stock', stockData);
      }

      toast.success(`Product stock ${stock_id ? 'updated' : 'added'} successfully!`);
      onClose();
      navigate('/product_inventory');
    } catch (error) {
      console.error('Error saving product stock:', error.response ? error.response.data : error.message);
      toast.error('Error saving product stock.');
    }
  };

  return (
    <div className="stock-form">
      <h2>{stock_id ? 'Edit Product Stock' : 'Add Product Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select value={selectedProductId} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Variant:</label>
          <select value={selectedVariantId} onChange={(e) => setSelectedVariantId(e.target.value)}>
            <option value="">Select a variant</option>
            {filteredVariants.length > 0 ? (
              filteredVariants.map((variant) => (
                <option className="text-black" key={variant.size_variety_id} value={variant.size_variety_id}>
                  {variant.size_name}
                </option>
              ))
            ) : (
              <option value="">No variants available</option>
            )}
          </select>
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="Enter stock quantity"
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div>
          <button type="submit" className="add-stock">
            {stock_id ? 'Update Stock' : 'Add Stock'}
          </button>
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './StockForm.css'; // Import the CSS file for styling

const StockForm = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const { stock_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const currentStock = location.state?.currentStock || '';

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

  // Fetch variants
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
      const filtered = variants.filter(variant => variant.product_id === selectedProductId);
      setFilteredVariants(filtered);
      console.log('Filtered Variants:', filtered); // Debugging statement
    } else {
      setFilteredVariants([]);
    }
  }, [selectedProductId, variants]);

  // Fetch stock for editing
  useEffect(() => {
    if (stock_id) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_stock/${stock_id}`);
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
  }, [stock_id]);

  // Set stock quantity for current stock
  useEffect(() => {
    if (currentStock) {
      setStockQuantity(currentStock);
    }
  }, [currentStock]);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    setSelectedProductId(productId);
    setSelectedVariantId('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId || !selectedVariantId || !stockQuantity) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    const stockData = {
      product_id: selectedProductId,
      size_variety_id: selectedVariantId,
      stock_quantity: stockQuantity
    };

    try {
      if (stock_id) {
        // Update stock
        await axios.put(`http://localhost:5000/product_stock/${stock_id}`, stockData);
      } else {
        // Check if stock already exists
        const checkResponse = await axios.post('http://localhost:5000/product_stock/check', stockData);
        if (checkResponse.data.exists) {
          setErrorMessage('Stock already exists for the selected product and variant.');
          return;
        }
        // Add new stock
        await axios.post('http://localhost:5000/product_stock', stockData);
      }

      toast.success(`Product stock ${stock_id ? 'updated' : 'added'} successfully!`);
      onClose();
      navigate('/product_inventory');
    } catch (error) {
      console.error('Error saving product stock:', error.response ? error.response.data : error.message);
      toast.error('Error saving product stock.');
    }
  };
  return (
    <div className="stock-form">
      <h2>{stock_id ? 'Edit Product Stock' : 'Add Product Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select value={selectedProductId} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Variant:</label>
          <select value={selectedVariantId} onChange={(e) => setSelectedVariantId(e.target.value)}>
            <option value="">Select a variant</option>
            {filteredVariants.length > 0 ? (
              filteredVariants.map((variant) => (
                <option className="text-black" key={variant.size_variety_id} value={variant.size_variety_id}>
                  {variant.variety_name}
                </option>
              ))
            ) : (
              <option value="">No variants available</option>
            )}
          </select>
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="Enter stock quantity"
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div>
          <button type="submit" className="add-stock">
            {stock_id ? 'Update Stock' : 'Add Stock'}
          </button>
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;*/




  /*
  return (
    <div className="stock-form">
      <h2>{stock_id ? 'Edit Product Stock' : 'Add Product Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product:</label>
          <select value={selectedProductId} onChange={handleProductChange}>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Variant:</label>
          <select value={selectedVariantId} onChange={(e) => setSelectedVariantId(e.target.value)}>
            <option value="">Select a variant</option>
            {filteredVariants.length > 0 ? (
              filteredVariants.map((variant) => (
                <option className='text-black' key={variant.size_variety_id} value={variant.size_variety_id}>
                  {variant.variety_name}
                </option>
              ))
            ) : (
              <option value="">No variants available</option>
            )}
          </select>
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="Enter stock quantity"
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div>
        <button type="submit" className="add-stock">
        {stock_id ? 'Update Stock' : 'Add Stock'}
        </button>
      <button type="button" className="cancel" onClick={onClose}>
        Cancel
        </button>

        </div>
      </form>
    </div>
  );
};

export default StockForm;
*/






/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const StockForm = ({ addStock, updateStock }) => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const { stockId } = useParams();
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
    if (selectedProductId) {
      const filtered = variants.filter(variant => variant.product_id === selectedProductId);
      setFilteredVariants(filtered);
    } else {
      setFilteredVariants([]);
      setSelectedVariantId('');
    }
  }, [selectedProductId, variants]);

  // Fetch existing stock details if editing
  useEffect(() => {
    if (stockId) {
      const fetchStock = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_stock/${stockId}`);
          const { product_id, size_variety_id, stock_quantity } = response.data;
          setSelectedProductId(product_id);
          setSelectedVariantId(size_variety_id);
          setStockQuantity(stock_quantity.toString());
        } catch (error) {
          console.error('Error fetching stock details:', error.response ? error.response.data : error.message);
          toast.error('Error fetching stock details.');
        }
      };

      fetchStock();
    }
  }, [stockId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId || !selectedVariantId || stockQuantity === '') {
      toast.error('Please select a product, variant, and enter stock quantity.');
      return;
    }

    const stockData = {
      product_id: selectedProductId,
      size_variety_id: selectedVariantId,
      stock_quantity: parseInt(stockQuantity, 10),
    };

    try {
      if (stockId) {
        await axios.put(`http://localhost:5000/product_stock/${stockId}`, stockData);
        toast.success('Stock updated successfully.');
        updateStock(stockData);
      } else {
        await axios.post('http://localhost:5000/product_stock', stockData);
        toast.success('Stock added successfully.');
        addStock(stockData);
      }

      navigate('/inventory');
    } catch (error) {
      console.error('Error saving stock:', error.response ? error.response.data : error.message);
      toast.error('Error saving stock.');
    }
  };

  return (
    <div className="stock-form">
      <h2>{stockId ? 'Edit Stock' : 'Add New Stock'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Product:
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            required
            className="form-select"
            disabled={!!stockId}
          >
            <option value="" disabled>Select Product</option>
            {products.map(product => (
              <option key={product.product_id} value={product.product_id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </label>

        {selectedProductId && (
          <label>
            Variant:
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              required
              className="form-select"
              disabled={!!stockId}
            >
              <option value="" disabled>Select Variant</option>
              {filteredVariants.map(variant => (
                <option key={variant.size_variety_id} value={variant.size_variety_id}>
                  {variant.size_name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label>
          Stock Quantity:
          <input
            type="text"
            placeholder="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="form-input"
            required
          />
        </label>

        <button type="submit" className="form-button">
          {stockId ? 'Update' : 'Add'}
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default StockForm;*/