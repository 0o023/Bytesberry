import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './area/Tealio_admin/Sidebar';
import Home from './area/Tealio_admin/Home';
import ProductDetails from './area/Tealio_admin/ProductDetails';
import ProductDetailsForm from './area/Tealio_admin/ProductDetailsForm';
import ProductInventory from './area/Tealio_admin/ProductInventory';
import ProductVariants from './area/Tealio_admin/ProductVariants';
import ProductPrice from './area/Tealio_admin/ProductPrice';
import VariantForm from './area/Tealio_admin/VariantForm';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [prices, setPrices] = useState([]);

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

  const addPrice = (priceData) => {
    setPrices([...prices, priceData]);
  };

  const ProductDetailsWithNavigate = (props) => {
    const navigate = useNavigate();
    return (
      <ProductDetails
        {...props}
        onEdit={(id) => navigate(`/details/edit/${id}`)}
        onDelete={deleteProduct}
      />
    );
  };

  return (

      <div className="App">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/details"
              element={
                <ProductDetailsWithNavigate
                  products={products}
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
              element={<ProductInventory products={products} />}
            />
            <Route
              path="/variants"
              element={
                <ProductVariants
                  products={products}
                  variants={variants}
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

  );
};

export default App;
