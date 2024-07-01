import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdateProduct = async () => {
    try {
      await axios.post('http://localhost:3000/update_product', {
        product_id: productId,
        product_name: name,
        product_description: description,
      });
      alert('Product updated successfully');
    } catch (error) {
      console.error(error);
      alert('Error updating product');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUpdateProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
