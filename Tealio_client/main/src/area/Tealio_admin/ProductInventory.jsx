import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility feature for modal

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [editStockId, setEditStockId] = useState(null);
  const [stockValue, setStockValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantToEdit, setVariantToEdit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_generic_details');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        toast.error('Error fetching products.');
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_variety_size');
        console.log('Fetched variants:', response.data);
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error.response ? error.response.data : error.message);
        toast.error('Error fetching variants.');
      }
    };

    fetchProducts();
    fetchVariants();
  }, []);

  const handleStockChange = (variantId, stock) => {
    setVariants(prevVariants =>
      prevVariants.map(variant =>
        variant.size_variety_id === variantId ? { ...variant, stock } : variant
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
        id: variantToEdit,
        stock: parseInt(stockValue, 10)
      });
      handleStockChange(variantToEdit, parseInt(stockValue, 10));
      toast.success('Stock updated successfully.');
    } catch (error) {
      console.error('Error updating stock:', error.response ? error.response.data : error.message);
      toast.error('Error updating stock.');
    }

    setStockValue('');
    setErrorMessage('');
    setIsModalOpen(false);
  };

  const handleEditClick = (variantId, currentStock) => {
    setVariantToEdit(variantId);
    setStockValue(currentStock !== undefined ? currentStock : '0'); // Default to '0' if currentStock is undefined
    setIsModalOpen(true); // Open the modal to edit stock
  };

  const handleNavigation = (id) => {
    navigate(`/inventory/update_stock/${id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVariantToEdit(null);
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product.product_id === productId);
    return product ? product.product_name : 'Unknown Product';
  };

  return (
    <div className="content">
      <h2>Product Inventory</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {products.length === 0 ? (
        <p>No products available. Please add a product.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Sl. No</th>
              <th>Product</th>
              <th>Variant</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.length > 0 ? (
              variants.map((variant, index) => (
                <tr key={variant.size_variety_id}>
                  <td>{index + 1}</td>
                  <td>{getProductName(variant.product_id)}</td>
                  <td>{variant.size_name}</td>
                  <td>
                    {editStockId === variant.size_variety_id ? (
                      <form onSubmit={handleStockSubmit} className="stock-form">
                        <input
                          type="number"
                          value={stockValue}
                          onChange={(e) => setStockValue(e.target.value)}
                          min="0"
                          required
                        />
                        <button type="submit">Update</button>
                        <button type="button" onClick={closeModal}>Cancel</button>
                      </form>
                    ) : (
                      <span>{variant.stock !== undefined ? variant.stock : '0'}</span>
                    )}
                  </td>
                  <td>
                    {editStockId === variant.size_variety_id ? (
                      <button type="button" onClick={closeModal}>Cancel</button>
                    ) : (
                      <>
                        <button type="button" onClick={() => handleEditClick(variant.size_variety_id, variant.stock)}>Edit Stock</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No variants available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Stock Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Stock"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Edit Stock</h2>
        <form onSubmit={handleStockSubmit}>
          <label>
            Stock:
            <input
              type="number"
              value={stockValue}
              onChange={(e) => setStockValue(e.target.value)}
              min="0"
              required
            />
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default ProductInventory;
