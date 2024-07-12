import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility feature for modal

const ProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentStock, setCurrentStock] = useState(0);
  const [variantToDelete, setVariantToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_generic_details');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        toast.error('Error fetching products.');
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_variety_size');
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error.response ? error.response.data : error.message);
        toast.error('Error fetching variants.');
      }
    };

    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_stock');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error.response ? error.response.data : error.message);
        toast.error('Error fetching stocks.');
      }
    };

    fetchProducts();
    fetchVariants();
    fetchStocks();
  }, []);

  const handleEditStock = (variant) => {
    setSelectedVariant(variant);
    setCurrentStock(variant.stock || 0);
    setIsEditModalOpen(true);
  };

  const handleStockUpdate = async (newStock) => {
    if (selectedVariant) {
      const { size_variety_id } = selectedVariant;
      try {
        await axios.put(`http://localhost:3000/product_variety_size/${size_variety_id}`, {
          stock: newStock,
        });
        setVariants((prevVariants) =>
          prevVariants.map((variant) =>
            variant.size_variety_id === size_variety_id
              ? { ...variant, stock: newStock }
              : variant
          )
        );
        toast.success('Stock updated successfully.');
      } catch (error) {
        console.error('Error updating stock:', error.response ? error.response.data : error.message);
        toast.error('Error updating stock.');
      }
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteConfirmation = (variantId) => {
    setVariantToDelete(variantId);
    setIsDeleteModalOpen(true);
  };

  const handleStockDelete = async () => {
    if (variantToDelete) {
      try {
        await axios.delete(`http://localhost:3000/product_stock/${variantToDelete}`);
        setStocks((prevStocks) => prevStocks.filter((stock) => stock.size_variety_id !== variantToDelete));
        toast.success('Stock deleted successfully.');
      } catch (error) {
        console.error('Error deleting stock:', error.response ? error.response.data : error.message);
        toast.error('Error deleting stock.');
      }
      setIsDeleteModalOpen(false);
      setVariantToDelete(null); // Reset state after successful deletion
    }
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedVariant(null);
    setVariantToDelete(null);
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product.product_id === productId);
    return product ? product.product_name : 'Unknown Product';
  };

  return (
    <div className="content">
      <h2>Product Inventory</h2>
      <Link to="/inventory/add">
        <button>Add Stock</button>
      </Link>
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
            variants.map((variant, index) => {
              const product = getProductName(variant.product_id);
              const stock = stocks.find((stock) => stock.size_variety_id === variant.size_variety_id);
              const currentStock = stock ? stock.stock_quantity : 0;

              return (
                <tr key={variant.size_variety_id}>
                  <td>{index + 1}</td>
                  <td>{product}</td>
                  <td>{variant.size_name}</td>
                  <td>{currentStock}</td>
                  <td>
                    <button onClick={() => handleEditStock(variant)}>Edit</button>
                    <button onClick={() => handleDeleteConfirmation(variant.size_variety_id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No variants available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Delete Stock Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Stock"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Delete Stock</h2>
        <p>Are you sure you want to delete this stock?</p>
        <button onClick={handleStockDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>

      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default ProductInventory;
