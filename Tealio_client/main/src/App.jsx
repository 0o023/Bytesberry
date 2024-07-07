import React, { useEffect, useRef,useState } from 'react';
import { forwardRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes, useLocation  } from 'react-router-dom';
import Hero from './components/hero';
import SideCart from './components/cart';
import { CartProvider, useCart } from './components/CartContext';
//i/mport PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactInfo from './components/ContactInfo';
import ShippingPolicy from './components/ShippingPolicy';
import RefundPolicy from './components/RefundPolicy';
import Checkout from './components/Checkout';
import OrderSummary from './components/OrderSummary';
import TrackOrder from './components/TrackOrder';
import AdminHome from './components/admin/AdminHome'; // Import AdminHome component
import AdminLogin from './components/admin/AdminLogin';
import AdminNavbar from './components/admin/AdminNavbar';

function App() {
  return (
    <CartProvider >
      <Router>
        <MainContent />
        <CartWrapper />
      </Router>
    </CartProvider>
  );
}

const MainContent = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const { cartItems,cartOpen} = useCart();

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };
  
  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [cartOpen]);

  const location = useLocation();

  const shouldDisplayFooter = () => {
    // Check if the current path is not /admin-home
    return !location.pathname.includes('/admin-home');
  };

  return (
    <div className="relative min-h-screen w- flex flex-col">
      <BlurWrapper>
      {location.pathname.includes('/admin') ? <AdminNavbar /> : <Navbar />}
        <div className="pt-20">
          <Routes>
          <Route path="/" element={<Hero />} />
            <Route path="/form"  element={<Checkout />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-info" element={<ContactInfo />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/forgot-password">

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

const SideCartWithRef = React.forwardRef((props, ref) => {
  return <div ref={ref}><SideCart {...props} /></div>;
});

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

  return <SideCartWithRef ref={cartRef} />;
};


export default App;