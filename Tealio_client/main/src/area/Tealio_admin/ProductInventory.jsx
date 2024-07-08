import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductInventory = () => {
  const [productList, setProductList] = useState([]);
  const [editStockId, setEditStockId] = useState(null);
  const [stockValue, setStockValue] = useState(''); // Initialize as an empty string
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_generic_details');
        console.log('Fetched products:', response.data); // Log the data to check its structure
        if (Array.isArray(response.data)) {
          setProductList(response.data);
        } else {
          toast.error('Failed to fetch products.');
        }
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        toast.error('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const handleStockChange = (id, stock) => {
    setProductList(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, stock } : product
      )
    );
    setEditStockId(null); // Close the input field after updating
  };

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    if (isNaN(stockValue) || stockValue < 0) {
      setErrorMessage('Please enter a valid stock number.');
      return;
    }
    
    try {
      await axios.post('http://localhost:3000/product_stock', {
        id: editStockId,
        stock: parseInt(stockValue, 10)
      });
      handleStockChange(editStockId, parseInt(stockValue, 10));
      toast.success('Stock updated successfully.');
    } catch (error) {
      console.error('Error updating stock:', error.response ? error.response.data : error.message);
      toast.error('Error updating stock.');
    }
    
    setStockValue('');
    setErrorMessage('');
  };

  const handleEditClick = (id, currentStock) => {
    setEditStockId(id);
    setStockValue(currentStock !== undefined ? currentStock : '0'); // Default to '0' if currentStock is undefined
  };

  const handleNavigation = (id) => {
    navigate(`/inventory/update_stock/${id}`);
  };

  return (
    <div className="content">
      <h2>Product Inventory</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {productList.length === 0 ? (
        <p>No products available. Please add a product.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product, index) => (
              <tr key={product.id}> {/* Use product.id as the key */}
                <td>{index + 1}</td>
                <td>{product.product_name || 'No name'}</td>
                <td>{product.product_discription || 'No description'}</td>
                <td>
                  {editStockId === product.id ? (
                    <form onSubmit={handleStockSubmit} className="stock-form">
                      <input
                        type="number"
                        value={stockValue}
                        onChange={(e) => setStockValue(e.target.value)}
                        min="0"
                        required
                      />
                      <button type="submit">Update</button>
                      <button type="button" onClick={() => setEditStockId(null)}>Cancel</button>
                    </form>
                  ) : (
                    <span>{product.stock !== undefined ? product.stock : '0'}</span>
                  )}
                </td>
                <td>
                  {editStockId === product.id ? (
                    <button type="button" onClick={() => setEditStockId(null)}>Cancel</button>
                  ) : (
                    <>
                      <button type="button" onClick={() => handleEditClick(product.id, product.stock)}>Edit Stock</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductInventory;
