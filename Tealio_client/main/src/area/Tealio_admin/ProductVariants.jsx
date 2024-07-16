

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility feature for modal

const ProductVariants = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

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

    const fetchVariants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_variety_size');
        setVariants(response.data);
      } catch (error) {
        console.error('Error fetching variants:', error.response ? error.response.data : error.message);
        toast.error('Error fetching variants.');
      }
    };

    fetchProducts();
    fetchVariants();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDelete = async () => {
    if (variantToDelete) {
      try {
        await axios.delete(`http://localhost:5000/product_variety_size/${variantToDelete}`);
        setVariants((prevVariants) => prevVariants.filter(variant => variant.size_variety_id !== variantToDelete));
        toast.success('Variant deleted successfully.');
      } catch (error) {
        console.error('Error deleting variant:', error.response ? error.response.data : error.message);
        toast.error('Error deleting variant.');
      }
      setIsModalOpen(false);
      setVariantToDelete(null); // Reset the variantToDelete state
    }
  };

  const openModal = (id) => {
    setVariantToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVariantToDelete(null); // Reset the variantToDelete state
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product.product_id === productId);
    return product ? product.product_name : 'Unknown Product';
  };

  const groupedVariants = variants.reduce((acc, variant) => {
    if (!acc[variant.product_id]) {
      acc[variant.product_id] = [];
    }
    acc[variant.product_id].push(variant);
    return acc;
  }, {});

  return (
    <div className="content">
      <h2>Product Variants</h2>
      <Link to="/variants/add">
        <button>Add Variant</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Sl. No.</th>
            <th>Product</th>
            <th>Variant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedVariants).length > 0 ? (
            Object.keys(groupedVariants).map((productId, index) => {
              const productVariants = groupedVariants[productId];
              return productVariants.map((variant, variantIndex) => (
                <tr key={variant.size_variety_id}>
                  {variantIndex === 0 ? (
                    <td rowSpan={productVariants.length}>{index + 1}</td>
                  ) : null}
                  {variantIndex === 0 ? (
                    <td rowSpan={productVariants.length}>{getProductName(productId)}</td>
                  ) : null}
                  <td>{variant.size_name}</td>
                  <td>
                    <Link to={`/variants/edit/${variant.product_id}/${variant.size_name}/${variant.size_variety_id}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={() => openModal(variant.size_variety_id)}>Delete</button>
                  </td>
                </tr>
              ));
            })
          ) : (
            <tr>
              <td colSpan="4">No variants available</td>
            </tr>
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
        <h2>Are you sure you want to delete this variant?</h2>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default ProductVariants;
