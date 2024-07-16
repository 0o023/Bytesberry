import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility feature for modal

const ProductPrice = () => {
  const [prices, setPrices] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceToDelete, setPriceToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product_price');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error.response ? error.response.data : error.message);
        toast.error('Error fetching prices.');
      }
    };

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

    fetchPrices();
    fetchProducts();
    fetchVariants();
  }, []);

  const getProductById = (id) => products.find((product) => product.product_id === id);
  const getVariantById = (id) => variants.find((variant) => variant.size_variety_id === id);

  const handleEdit = (id) => {
    navigate(`/price/edit/${id}`);
  };

  const handleDelete = async () => {
    if (priceToDelete) {
      try {
        await axios.delete(`http://localhost:5000/product_price/${priceToDelete}`);
        setPrices((prevPrices) => prevPrices.filter((price) => price.price_id !== priceToDelete));
        toast.success('Price deleted successfully.');
      } catch (error) {
        console.error('Error deleting price:', error.response ? error.response.data : error.message);
        toast.error('Error deleting price.');
      }
      setIsModalOpen(false);
    }
  };

  const openModal = (id) => {
    setPriceToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPriceToDelete(null);
  };

  return (
    <div>
      <h2>Product Prices</h2>
      <Link to="/price/add">
        <button>Add New Price</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Variant</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.length === 0 ? (
            <tr>
              <td colSpan="5">No prices available</td>
            </tr>
          ) : (
            prices.map((price) => {
              const product = getProductById(price.product_id);
              const variant = getVariantById(price.size_variety_id);
              return (
                <tr key={price.price_id}>
                  <td>{product ? product.product_name : 'Unknown Product'}</td>
                  <td>{variant ? variant.size_name : 'Unknown Variant'}</td>
                  <td>{price.price}</td>
                  <td>{price.discount_percentage}%</td>
                  <td>
                    <button onClick={() => handleEdit(price.price_id)}>Edit</button>
                    <button onClick={() => openModal(price.price_id)}>Delete</button>
                  </td>
                </tr>
              );
            })
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
        <h2>Are you sure you want to delete this price?</h2>
        <button onClick={handleDelete}>Yes, Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default ProductPrice;