import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminNavbar from './components/AdminNavbar'; // Updated import
import OrderDetails from './components/OrderDetails';
import Footer from './components/footer';
import ProductDetail from './components/ProductDetail';
import DeliveredProducts from './components/DeliveredProducts'; // Import the DeliveredProducts component
import ShippingDetails from './components/ShippingDetails'; // Import the ShippingDetails component
import MoreShipping from './components/MoreShipping'; // Import the MoreShipping component
import MoreDelivered from './components/MoreDelivered'; // Import the MoreDelivered component
import AdminHome from './components/AdminHome'; // Import the AdminHome component
import TableComponent from './components/TableComponent'; // Import the TableComponent
import DynamicTable from './components/DynamicTable'; // Import the DynamicTable
import Navbar from './components/navbar'; // Import the Navbar component

import './components/tailwind.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/tracking"
            element={
              <>
                <Navbar />
                <TableComponent />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <AdminNavbar /> {/* Updated component name */}
                <AdminHome />
              </>
            }
          />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/order-details/:id" element={<ProductDetail />} />
          <Route path="/cart" element={
            <>
              <header className="App-header">
                <div className="container">
                  <h2>Your Cart</h2>
                  {/* Add your Cart component or content here */}
                </div>
              </header>
              <Footer /> {/* Ensure the Footer is placed here */}
            </>
          } />
          <Route path="/delivered" element={<DeliveredProducts />} /> {/* Added DeliveredProducts route */}
          <Route path="/shipping" element={<ShippingDetails />} /> {/* Added ShippingDetails route */}
          <Route path="/more-shipping/:id" element={<MoreShipping />} /> {/* Added MoreShipping route */}
          <Route path="/more-delivered/:id" element={<MoreDelivered />} /> {/* Added MoreDelivered route */}
          <Route path="/dynamic-table/:tableName" element={<DynamicTable />} /> {/* Added DynamicTable route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
