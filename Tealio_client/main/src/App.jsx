import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Existing Navbar component
import Footer from './components/Footer';
import Hero from './components/heroPage';
import SideCart from './components/cart';
import { CartProvider, useCart } from './components/CartContext';
import TermsOfService from './components/TermsOfService';
import ContactInfo from './components/ContactInfo';
import ShippingPolicy from './components/ShippingPolicy';
import PrivacyPolicy from './components/PrivacyPolicy';
import RefundPolicy from './components/RefundPolicy';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import TrackOrder from './components/TrackOrder';
import AdminHome from './components/AdminHome'; // Import AdminHome component
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './components/AdminNavbar'; // Import AdminNavbar component
 // Import OrderDetails component

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
  const { cartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [cartOpen]);

  // Function to determine if footer should be displayed
  const shouldDisplayFooter = () => {
    // Check if the current path is not /admin-home
    return !location.pathname.includes('/admin-home');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <BlurWrapper>
        {location.pathname.includes('/admin') ? <AdminNavbar /> : <Navbar />}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/checkout" element={<Checkout totalAmount={totalAmount} />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-info" element={<ContactInfo />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            
            <Route path="/forgot-password">
              {/* Add your Forgot Password component here */}
            </Route>
          </Routes>
        </div>
        {shouldDisplayFooter() && <Footer />}
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
