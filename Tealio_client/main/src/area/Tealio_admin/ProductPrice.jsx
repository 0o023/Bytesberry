import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductPrice = ({ products = [], prices = [], addPrice }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Reset selectedVariant when selectedProduct changes
    setSelectedVariant('');
  }, [selectedProduct]);

  const handleAddPrice = () => {
    if (!selectedProduct || !selectedVariant || !price) {
      alert('Please select a product, variant, and enter a price.');
      return;
    }

    const newPrice = {
      productId: selectedProduct,
      variantName: selectedVariant,
      price: price,
    };
    addPrice(newPrice);
    setSelectedProduct('');
    setSelectedVariant('');
    setPrice('');
  };

  const handleProductClick = (productId) => {
    navigate(`/details/edit/${productId}`); // Navigate to product details page
  };

  // Get variants for the selected product
  const selectedProductVariants = products.find(product => product.id === selectedProduct)?.variants || [];

  return (
    <div className="content">
      <h2>Product Price</h2>

      {products.length === 0 ? (
        <p>No products available. Please add a product before setting prices.</p>
      ) : (
        <>
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="" disabled>Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>{product.name}</option>
            ))}
          </select>

          {selectedProduct && (
            <>
              <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)}>
                <option value="" disabled>Select Variant</option>
                {selectedProductVariants.map((variant) => (
                  <option key={variant.name} value={variant.name}>{variant.name}</option>
                ))}
              </select>
            </>
          )}

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button onClick={handleAddPrice}>Add Price</button>
        </>
      )}

      {prices.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Variant</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((priceData, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => handleProductClick(priceData.productId)}>
                    {priceData.productId}
                  </button>
                </td>
                <td>{priceData.variantName}</td>
                <td>{priceData.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductPrice;
