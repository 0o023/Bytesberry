import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './MoreShipping.css';

function MoreShipping() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get('http://localhost:5000/get_all_shipped_order_details');
        const orders = Array.isArray(response.data) ? response.data : [];
        const foundProduct = orders.find(order => order.order_id.toString() === id); // orders.find: Finds the product that matches the id from the URL.

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  // Utility function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Conditional Rendering
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="App more-shipping-page">
      <Navbar />
      <div className="more-shipping-container">
        <div className="shipping-info">
          <p><strong>Order No:</strong> {product.order_no}</p>
        </div>
        <div className="shipping-details-table">
          <table>
            <thead>
              <tr>
                <th>Product Details</th>
                <th>Payment Mode</th>
                <th>Order Status</th>
                <th>Payment Status</th>
                <th>Delivery Date</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="shipping-details-cell">
                    <img src={product.file_url} alt={product.product_name} className="product-image" />
                    <div>
                      <p><strong>{product.product_name}</strong></p>
                      <p><strong>Order ID:</strong> {product.order_id}</p>
                      <p><strong>Order Date:</strong> {formatDate(product.order_date)}</p>
                    </div>
                  </div>
                </td>
                <td>{product.payment_mode}</td>
                <td>{product.order_status}</td>
                <td>{product.payment_status}</td>
                <td>{formatDate(product.order_delivered_date)}</td>
                <td>&#8377; {product.order_total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="customer-details-table">
          <table>
            <thead>
              <tr>
                <th>Customer Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="customer-details-cell">
                    <p><strong>Customer Name:</strong> {product.customer_name}</p>
                    <div className="phone-details">
                      <img src="https://static.vecteezy.com/system/resources/previews/003/720/498/original/phone-icon-telephone-icon-symbol-for-app-and-messenger-vector.jpg" alt="Phone Icon" className="phone-icon" />
                      <p><strong>Phone Number:</strong> {product.customer_phone_no}</p>
                    </div>
                    <div className="billing-details">
                      <img src="https://cdn-icons-png.freepik.com/512/4820/4820122.png" alt="Address Icon" className="address-icon" />
                      <p><strong>Billing Address:</strong> {product.billing_add}</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="more-shipping-footer" />
    </div>
  );
}

export default MoreShipping;
