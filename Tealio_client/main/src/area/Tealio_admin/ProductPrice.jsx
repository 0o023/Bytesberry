import React, { useState } from 'react';

const ProductPrice = ({ products, prices, addPrice }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [price, setPrice] = useState('');

  const handleAddPrice = () => {
    const newPrice = {
      productId: selectedProduct,
      price: price,
    };
    addPrice(newPrice);
    setSelectedProduct('');
    setPrice('');
  };

  return (
    <div className="content">
      <h2>Product Price</h2>
      <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
        <option value="" disabled>Select Product</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>{product.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={handleAddPrice}>Add Price</button>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((priceData, index) => (
            <tr key={index}>
              <td>{priceData.productId}</td>
              <td>{priceData.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPrice;
