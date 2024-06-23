/*import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import ViewOrdersPage from'./pages/ViewOrdersPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/place_order" element={<OrderPage />} />
        <Route path="/orders" element={<ViewOrdersPage />} />
      </Routes>
    </Router>
  );
};

export default App;
*/

/*
import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from './components/hero';
import SideCart from './components/cart';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
            </Routes>
          </div>
          <Footer />
          <SideCart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
*/

// This is for order management 


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar'; // Import the Navbar component
import Orders from './components/Orders';
import Shipping from './components/Shipping';
import Delivered from './components/Delivered';
import OrderDetails from './components/OrderDetails'; // Import the OrderDetails component
import Footer from './components/footer'; // Import the Footer component
import ProductDetail from './components/ProductDetail'; // Import the ProductDetail component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <h1 className="main-heading">Thank You for</h1>
                  <h1 className="main-heading">Shopping with us!</h1>
                  <div className="container">
                    <Orders />
                    <Shipping />
                    <Delivered />
                  </div>
                </header>
                <Footer /> {/* Ensure the Footer is placed here */}
              </>
            }
          />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route
            path="/order-details/:id"
            element={<ProductDetail />}
          />
          <Route
            path="/cart"
            element={
              <>
                <header className="App-header">
                  <h1 className="main-heading">Thank You for</h1>
                  <h1 className="main-heading">Shopping with us!</h1>
                  <div className="container">
                    <h2>Your Cart</h2>
                    {/* Add your Cart component or content here */}
                  </div>
                </header>
                <Footer /> {/* Ensure the Footer is placed here */}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

