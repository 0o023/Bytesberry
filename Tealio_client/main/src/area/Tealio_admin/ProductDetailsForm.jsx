import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

const ProductDetailsForm = ({ addProduct, updateProduct }) => {
  const [product_name, setProductName] = useState('');
  const [product_discription, setProductDiscription] = useState('');
  const [product_images, setProductImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/product_generic_details/${id}`);
          const product = response.data;

          // Set product details and existing images
          setProductName(product.product_name);
          setProductDiscription(product.product_discription);
          setExistingImages(product.product_images || []);
        } catch (error) {
          console.error('Error fetching product details:', error);
          setErrorMessage('Error fetching product details.');
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const imagePromises = Array.from(files).map(async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        });

        const base64 = await convertToBase64(compressedFile);
        setFileMessage('File converted to base64 successfully.');
        return base64; // Directly return base64 string
      } catch (error) {
        setFileMessage('Error processing file.');
        throw new Error('Error processing file');
      }
    });

    try {
      const images = await Promise.all(imagePromises);
      setProductImages(prevImages => [...prevImages, ...images]); // Append new images
    } catch (error) {
      setErrorMessage('Error processing images');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product_name || !product_discription) {
      alert('Please fill in all fields.');
      return;
    }

    const product = {
      product_name,
      product_discription,
      product_images: id ? existingImages.concat(product_images) : product_images, // Only include existingImages if editing
    };

    try {
      if (id) {
        await axios.put(`http://localhost:3000/product_generic_details/${id}`, product, {
          headers: { 'Content-Type': 'application/json' }
        });
        setSuccessMessage('Product updated successfully!');
        updateProduct(product);
      } else {
        await axios.post('http://localhost:3000/product_generic_details', product, {
          headers: { 'Content-Type': 'application/json' }
        });
        setSuccessMessage('Product added successfully!');
        addProduct(product);
      }
    } catch (error) {
      setErrorMessage('Error saving the product.');
      console.error('Submit error:', error);
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      navigate('/details');
    }, 2000);
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Product</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {fileMessage && <p>{fileMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={product_discription}
            onChange={(e) => setProductDiscription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'} Product</button>
      </form>
      <div>
        <h3>New Images:</h3>
        {product_images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`New Image ${index + 1}`} width="100" />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsForm;
