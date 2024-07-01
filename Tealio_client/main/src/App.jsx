// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './area/Tealio_admin/Home';
import ProductDetails from './area/Tealio_admin/ProductDetails';
import ProductDetailsForm from './area/Tealio_admin/ProductDetailsForm';
import ProductInventory from './area/Tealio_admin/ProductInventory';
import ProductVariants from './area/Tealio_admin/ProductVariants';
import ProductPrice from './area/Tealio_admin/ProductPrice';
import VariantForm from './area/Tealio_admin/VariantForm'; // Import for variant form

const App = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [prices, setPrices] = useState([]);

  // Functions to manage products
  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  // Functions to manage variants
  const addVariant = (variant) => {
    setVariants([...variants, variant]);
  };

  const updateVariant = (updatedVariant) => {
    setVariants(variants.map((variant) =>
      variant.productId === updatedVariant.productId && variant.name === updatedVariant.name
        ? updatedVariant
        : variant
    ));
  };

  const deleteVariant = (variantToDelete) => {
    setVariants(variants.filter((variant) =>
      variant.productId !== variantToDelete.productId || variant.name !== variantToDelete.name
    ));
  };

  // Functions to manage prices
  const addPrice = (priceData) => {
    setPrices([...prices, priceData]);
  };

  return (
    <Router>
      <div className="App">
        <h1>Tealio Admin Dashboard</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/details">Product Details</Link>
          <Link to="/inventory">Product Inventory</Link>
          <Link to="/variants">Product Variants</Link>
          <Link to="/price">Product Price</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/details"
              element={
                <ProductDetails
                  products={products}
                  onEdit={(id) => navigate(`/details/edit/${id}`)}
                  onDelete={deleteProduct}
                />
              }
            />
            <Route
              path="/details/add"
              element={<ProductDetailsForm addProduct={addProduct} />}
            />
            <Route
              path="/details/edit/:id"
              element={
                <ProductDetailsForm
                  products={products}
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                />
              }
            />
           <Route
              path="/inventory"
              element={<ProductInventory />}
            />
            <Route
              path="/variants"
              element={
                <ProductVariants
                  products={products}
                  variants={variants}
                  editVariant={updateVariant}
                  deleteVariant={deleteVariant}
                />
              }
            />
            <Route
              path="/variants/add"
              element={
                <VariantForm
                  products={products}
                  addVariant={addVariant}
                />
              }
            />
            <Route
              path="/variants/edit/:productId/:variantName"
              element={
                <VariantForm
                  products={products}
                  updateVariant={updateVariant}
                />
              }
            />
            <Route
              path="/price"
              element={<ProductPrice />}
            />
          </Routes> 
        </div>
      </div>
    </Router>
  );
};

export default App;
