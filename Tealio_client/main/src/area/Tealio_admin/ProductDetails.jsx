import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility feature for modal

const ProductDetails = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product_generic_details');
        console.log('Products fetched:', response.data); // Log the fetched products
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        toast.error('Error fetching products.');
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/details/edit/${id}`);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        // First delete related records from utbl_product_variety_size
        await axios.delete(`http://localhost:3000/product_variety_size/${productToDelete}`);
        
        // Then delete the product from utbl_product_generic_details
        await axios.delete(`http://localhost:3000/product_generic_details/${productToDelete}`);
        
        setProducts((prevProducts) => prevProducts.filter(product => product.product_id !== productToDelete));
        toast.success('Product deleted successfully.');
      } catch (error) {
        console.error('Error deleting product:', error.response ? error.response.data : error.message);
        toast.error('Error deleting product.');
      }
      setIsModalOpen(false);
    }
  };

  const openModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <h2>Product Details</h2>
      <Link to="/details/add">
        <button>Add Product</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.product_id}>
                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{product.product_discription || 'No description available'}</td>
                <td>
                  <button onClick={() => handleEdit(product.product_id)}>Edit</button>
                  <button onClick={() => openModal(product.product_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Are you sure you want to delete this product?</h2>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default ProductDetails;
