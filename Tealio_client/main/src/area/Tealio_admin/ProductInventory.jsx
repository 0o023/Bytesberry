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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/product_generic_details');
        setProducts(productsResponse.data);

        const variantsResponse = await axios.get('http://localhost:5000/product_variety_size');
        setVariants(variantsResponse.data);

        const stocksResponse = await axios.get('http://localhost:5000/product_stock');
        setStocks(stocksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        toast.error('Error fetching inventory data.');
      }
    };

    fetchData();
  }, []);

  const handleDeleteConfirmation = (variantId) => {
    setVariantToDelete(variantId);
    setIsDeleteModalOpen(true);
  };

  const handleStockDelete = async () => {
    if (variantToDelete) {
      try {
        console.log(`Attempting to delete stock with ID: ${variantToDelete}`);
        await axios.delete(`http://localhost:5000/product_stock/${variantToDelete}`);
        
        // Set stock quantity to zero instead of removing the stock
        setStocks((prevStocks) =>
          prevStocks.map((stock) =>
            stock.size_variety_id === variantToDelete
              ? { ...stock, stock_quantity: 0 }
              : stock
          )
        );

        toast.success('Stock deleted successfully.');
        console.log('Stock deleted successfully.');
      } catch (error) {
        console.error('Error deleting stock:', error.response ? error.response.data : error.message);
        toast.error('Error deleting stock.');
      }
      setIsDeleteModalOpen(false);
      setVariantToDelete(null); // Reset state after successful deletion
    }
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setVariantToDelete(null);
  };

  const getProductName = (productId) => {
    const foundProduct = products.find((product) => product.product_id === productId);
    return foundProduct ? foundProduct.product_name : 'Unknown Product';
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
                    {stock && currentStock > 0 ? (
                      <Link
                        to={{
                          pathname: `/inventory/edit/${stock.stock_id}`,
                          state: { productId: variant.product_id, variantName: variant.size_name }
                        }}
                      >
                        <button>Edit</button>
                      </Link>
                    ) : (
                      <button disabled>Edit</button>
                    )}
                    <button onClick={() => handleDeleteConfirmation(variant.size_variety_id)} disabled={currentStock === 0}>Delete</button>
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
