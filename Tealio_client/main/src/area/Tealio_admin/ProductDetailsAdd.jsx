import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ProductDetailsAdd = ({ addProduct }) => {
  const [product_name, setProductName] = useState('');
  const [product_discription, setProductDiscription] = useState('');
  const [product_images, setProductImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const navigate = useNavigate();

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
        return { url: base64 }; // Return an object with url key
      } catch (error) {
        setFileMessage('Error processing file.');
        throw new Error('Error processing file');
      }
    });

    try {
      const images = await Promise.all(imagePromises);
      setProductImages(prevImages => [...prevImages, ...images]);
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
      product_images,
    };

    try {
      await axios.post('http://localhost:5000/product_generic_details', product, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccessMessage('Product added successfully!');
      addProduct(product);
    } catch (error) {
      // Log the error for debugging
      console.error('Submit error:', error);

      // Check if error is an AxiosError
      if (axios.isAxiosError(error)) {
        // Access detailed error information
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;

        // Provide more specific error messages
        if (status === 400) {
          setErrorMessage('Bad request. Please check the input data.');
        } else if (status === 404) {
          setErrorMessage('Resource not found.');
        } else if (status === 500) {
          setErrorMessage('Server error. Please try again later.');
        } else {
          setErrorMessage(`Error: ${message}`);
        }
      } else {
        // Handle unexpected errors
        setErrorMessage('An unexpected error occurred.');
      }
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      navigate('/details');
    }, 2000);
  };

  return (
    <div>
      <h2>Add Product</h2>
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
        <button type="submit">Add Product</button>
      </form>
      <div>
        <h3>New Images:</h3>
        {product_images.map((img, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img src={img.url} alt={`New Image ${index + 1}`} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsAdd;
