import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './ProductDetail.css';

const orders = [
  {
    id: '1024',
    productName: 'Tealio Tea chai patti',
    productImage: 'https://m.media-amazon.com/images/I/41LR5-IXEzL.jpg',
    orderDeliveredDate: '2024-08-30',
    orderNumber: '111',
    orderDate: '2024-08-21',
    orderStatus: 'Initiated',
    deliveryImage: 'https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/receive-delivery-send-box-4-512.png',
    customerName: 'Abishek Pradhan',
    customerPhone: '6753428876',
    billingAddress: 'Laal Bazaar, 14th mile P.O Hungry Jack, Gangtok, Sikkim',
    paymentMode: 'COD',
    paymentStatus: 'Completed',
    totalPrice: '2000.00',
    payOnDeliveryImage: 'https://cdn0.iconfinder.com/data/icons/banking-money/120/cash_indian_rupee-512.png' // Replace with the actual image URL
  },
  
  {
    id: 9999,
      productName: 'Kalimpong Special Chai Patti',
      productImage: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/tea/n/d/7/2502-chai-patti-2-pouch-regular-tea-om-manglam-leaves-original-imagz4weuc48juhg.jpeg?q=90&crop=false', // Replace with your second image path
      orderDeliveredDate: '2024-03-05',
      orderNumber: '5677',
      orderDate: '2024-02-17',
      orderStatus: 'Initiated',
      deliveryImage: 'https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/receive-delivery-send-box-4-512.png',
      customerName: 'Jordi Singh',
      customerPhone: '34556789',
      billingAddress: '11th Mile, P.O Topkhana, Kalimpong, West Bengal',
      paymentMode: 'COD',
      paymentStatus: 'Completed',
      orderAmount: '4533/-',
      totalPrice: '1000.00',
      payOnDeliveryImage: 'https://cdn0.iconfinder.com/data/icons/banking-money/120/cash_indian_rupee-512.png' // Replace with the actual image URL
  },

  {
    id: 5671,
      productName: 'Darjeeling Chai Patti',
      productImage: 'https://rukminim2.flixcart.com/image/850/1000/k2arbm80/tea/v/z/c/250-premium-darjeeling-tea-orthodox-leaf-250-gm-green-tea-original-imafhzm6mgtrucax.jpeg?q=90&crop=false', // Replace with your second image path
      orderDeliveredDate: '2024-12-25',
      orderNumber: '5677',
      orderDate: '2024-08-27',
      orderStatus: 'Initiated',
      deliveryImage: 'https://cdn2.iconfinder.com/data/icons/delivery-and-logistic/64/receive-delivery-send-box-4-512.png',
      customerName: 'Immanuel Bahing Rai',
      customerPhone: '45112390',
      billingAddress: '17th Mile, Pedong, Kalimpong, West Bengal',
      paymentMode: 'COD',
      paymentStatus: 'Completed',
      orderAmount: '1533/-',
      totalPrice: '5000.00',
      payOnDeliveryImage: 'https://cdn0.iconfinder.com/data/icons/banking-money/120/cash_indian_rupee-512.png' // Replace with the actual image URL
  }
];

function ProductDetail() {
  const { id } = useParams();
  const product = orders.find(order => order.id.toString() === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="App product-detail-page">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-info-container">
          <img src={product.productImage} alt={product.productName} className="product-image" />
          <h1 className="view-product-name">{product.productName}</h1>
          <div className="delivery-info">
            <img src={product.deliveryImage} alt="Delivery Icon" className="delivery-icon" />
            <div className="delivery-text">
              <p>Delivery on {product.orderDeliveredDate}</p>
            </div>
          </div>
        </div>
        <div className="order-info-container">
          <h2 className="order-info-heading">Order Info</h2>
          <p><strong>Order ID:</strong> {product.id} <span className="separator">|</span> <strong>Order Date:</strong> {product.orderDate}</p>
          <p><strong>Order Status:</strong> {product.orderStatus} <span className="separator">|</span> <strong>Order Number:</strong> {product.orderNumber}</p>
        </div>
        <div className="customer-info-container">
          <h2 className="customer-info-heading">Customer Info</h2>
          <p><strong>Customer Name:</strong> {product.customerName} <span className="separator">|</span> <strong>Customer Phone Number:</strong> {product.customerPhone}</p>
          <p><strong>Billing Address:</strong> {product.billingAddress}</p>
        </div>
        <div className="payment-info-container">
          <h2 className="payment-info-heading">Payment Info</h2>
          <p><strong>Payment Mode:</strong> {product.paymentMode} <span className="separator">|</span> <strong>Payment Status:</strong> {product.paymentStatus}</p>
        </div>
        <div className="total-price-container">
          <h2 className="total-price-heading">Total Price:</h2>
          <p className="total-price-amount">&#8377; {product.totalPrice}</p>
          <div className="pay-on-delivery-info">
            <img src={product.payOnDeliveryImage} alt="Pay on Delivery Icon" className="pay-on-delivery-icon" />
            <div className="pay-on-delivery-text">
              <p>Pay on Delivery</p>
            </div>
          </div>
        </div>
      </div>
      <Footer hideLine={true} hideGallery={true} className="product-detail-footer" />
    </div>
  );
}

export default ProductDetail;
