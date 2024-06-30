// src/App.jsx
import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/heroPage';
import SideCart from './components/cart';
import { CartProvider, useCart } from './components/CartContext';
import TermsOfService from './components/TermsOfService';
import ContactInfo from './components/ContactInfo';
import ShippingPolicy from './components/ShippingPolicy';
import RefundPolicy from './components/RefundPolicy';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import TrackOrder from './components/TrackOrder';

function App() {
  return (
    <CartProvider>
      <Router>
      
        <MainContent />
        <CartWrapper />
      </Router>
    </CartProvider>
  );
}

const MainContent = () => {
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const { cartOpen } = useCart();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [cartOpen]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <BlurWrapper>
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/checkout" element={<Checkout totalAmount={totalAmount} />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-info" element={<ContactInfo />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/track-order" element={<TrackOrder />} />
          </Routes>
        </div>
        <Footer />
      </BlurWrapper>
    </div>
  );
};

const BlurWrapper = ({ children }) => {
  const { cartOpen } = useCart();
  return (
    <div className={`${cartOpen ? 'blur-sm ' : ''} absolute inset-0`}>
      {children}
    </div>
  );
};

const CartWrapper = () => {
  const { cartOpen, closeCart } = useCart();
  const cartRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCart();
      }
    };

    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen, closeCart]);

  return <SideCart ref={cartRef} />;
};

export default App;
