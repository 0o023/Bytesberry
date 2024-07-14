import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import { useNavigate, useParams } from 'react-router-dom';

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

const ProductDetailsEdit = ({ updateProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [fileMessage, setFileMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/product_generic_details/${id}`);
          const product = response.data;

          setProductName(product.product_name);
          setProductDescription(product.product_discription);
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
        return { url: base64 };
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

  const handleDeleteExistingImage = (index) => {
    setImagesToDelete(prev => [...prev, existingImages[index]]);
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = async () => {
    if (productImages.length === 0) {
      setFileMessage('Please select images to upload.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/product_image/add/${id}`, { images: productImages }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccessMessage('Images added successfully!');
      setProductImages([]);
    } catch (error) {
      setErrorMessage('Error adding images.');
      console.error('Add image error:', error);
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setFileMessage('');
      navigate(`/details/${id}`);
    }, 2000);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!productName || !productDescription) {
      alert('Please fill in all fields.');
      return;
    }

    const product = {
      product_name: productName,
      product_description: productDescription,
      product_images: existingImages.concat(productImages),
      imagesToDelete,
    };

    try {
      await axios.put(`http://localhost:5000/product_generic_details/${id}`, product, {
        headers: { 'Content-Type': 'application/json' }
      });
      setSuccessMessage('Product updated successfully!');
      updateProduct(product);
    } catch (error) {
      setErrorMessage('Error updating product.');
      console.error('Update product error:', error);
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      navigate(`/details/${id}`);
    }, 2000);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {fileMessage && <p>{fileMessage}</p>}
      <form onSubmit={handleUpdateProduct}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
      <div>
        <h3>Add New Images:</h3>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
        <button onClick={handleAddImage}>Add Images</button>
      </div>
      <div>
        <h3>Existing Images:</h3>
        {existingImages.map((img, index) => (
          <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img src={img.url} alt={`Existing Image ${index + 1}`} width="100" />
            <button
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteExistingImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>New Images:</h3>
        {productImages.map((img, index) => (
          <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
            <img src={img.url} alt={`New Image ${index + 1}`} width="100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsEdit;
