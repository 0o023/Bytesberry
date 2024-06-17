import React, { useEffect, useRef } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import BasicForm from './components/form';
import SideCart from './components/cart';
import { CartProvider, useCart } from './components/CartContext';

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
            <Route path="/form" element={<BasicForm />} />
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
