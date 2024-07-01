import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:3000/insert_product', {
        name,
        description,
        imageUrls: images.split(','),
      });
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Image URLs (comma separated)" value={images} onChange={(e) => setImages(e.target.value)} />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
