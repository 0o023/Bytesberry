import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './area/Tealio_admin/Sidebar';
import Home from './area/Tealio_admin/Home';
import ProductDetails from './area/Tealio_admin/ProductDetails';
import ProductDetailsForm from './area/Tealio_admin/ProductDetailsForm';
import ProductInventory from './area/Tealio_admin/ProductInventory';
import ProductVariants from './area/Tealio_admin/ProductVariants';
import ProductPrice from './area/Tealio_admin/ProductPrice';
import ProductPriceForm from './area/Tealio_admin/ProductPriceForm';
import VariantForm from './area/Tealio_admin/VariantForm';
import StockForm from './area/Tealio_admin/StockForm';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [prices, setPrices] = useState([]);
  const [stock, setStock] = useState([]);

  // Product handlers
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

  // Variant handlers
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

  // Price handlers
  const addPrice = (priceData) => {
    setPrices([...prices, priceData]);
  };

  const updatePrice = (updatedPrice) => {
    setPrices(prices.map((price) =>
      price.price_id === updatedPrice.price_id ? updatedPrice : price
    ));
  };

  const deletePrice = (priceId) => {
    setPrices(prices.filter((price) => price.price_id !== priceId));
  };

  // Stock handlers
  const addStock = (stockData) => {
    setStock([...stock, stockData]);
  };

  const updateStock = (updatedStock) => {
    setStock(stock.map((item) =>
      item.stockId === updatedStock.stockId ? updatedStock : item
    ));
  };

  const deleteStock = (stockId) => {
    setStock(stock.filter((item) => item.stockId !== stockId));
  };

  // Route Components with Navigate and Location Hooks
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

  const ProductPriceWithNavigate = (props) => {
    const navigate = useNavigate();
    return (
      <ProductPrice
        {...props}
        prices={prices}
        setPrices={setPrices}
        addPrice={addPrice}
        updatePrice={updatePrice}
        deletePrice={deletePrice}
      />
    );
  };

  const ProductInventoryWithNavigate = (props) => {
    const navigate = useNavigate();
    return (
      <ProductInventory
        {...props}
        onEditStock={(variantId, currentStock) => navigate(`/inventory/edit/${variantId}`, { state: { currentStock } })}
      />
    );
  };

  const StockFormWithLocation = () => {
    const location = useLocation();
    const variantId = location.pathname.split('/').pop();
    const currentStock = location.state?.currentStock || '';

    return (
      <StockForm
        variantId={variantId}
        currentStock={currentStock}
        addStock={addStock}
        updateStock={updateStock}
        deleteStock={deleteStock}
        onSave={(stockValue) => console.log('Stock saved:', stockValue)}
        onClose={() => window.history.back()} // Navigate back to previous page
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
            element={<ProductInventoryWithNavigate products={products} variants={variants} />}
          />
          <Route
            path="/inventory/add"
            element={<StockForm
              variantId=""
              currentStock=""
              addStock={addStock}
              updateStock={updateStock}
              deleteStock={deleteStock}
              onSave={(stockValue) => console.log('Stock added:', stockValue)}
              onClose={() => window.history.back()}
            />}
          />
          <Route
            path="/inventory/edit/:variantId"
            element={<StockFormWithLocation />}
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
            element={
              <ProductPriceWithNavigate />
            }
          />
          <Route
            path="/price/add"
            element={
              <ProductPriceForm
                addPrice={addPrice}
              />
            }
          />
          <Route
            path="/price/edit/:priceId"
            element={
              <ProductPriceForm
                prices={prices}
                updatePrice={updatePrice}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
