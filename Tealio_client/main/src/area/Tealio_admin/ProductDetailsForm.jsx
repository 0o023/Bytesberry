// src/area/Tealio_admin/ProductDetailsForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const ProductDetailsForm = ({ products, addProduct, updateProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // For preserving existing images
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    if (id) {
      // Find the product to edit
      const product = products.find(product => product.id === id);
      if (product) {
        setName(product.name);
        setDescription(product.description);
        setExistingImages(product.images || []); // Set existing images
      }
    }
  }, [id, products]);

  const handleFileChange = async (e) => {
    if (id) return; // Prevent adding new images if editing

    const files = e.target.files;
    setErrorMessage('');
    
    const imagePromises = Array.from(files).map(file => {
      if (file.type.startsWith('image/')) {
        return convertToBase64(file);
      } else {
        setErrorMessage('Only image files are allowed.');
        return Promise.reject('Invalid file type');
      }
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      setImages(base64Images);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
      setErrorMessage('Error converting images to Base64.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const product = {
      id: id || Date.now().toString(), // Use existing ID if editing
      name,
      description,
      images: id ? existingImages : images, // Preserve existing images when editing
    };

    if (id) {
      updateProduct(product); // Update existing product
    } else {
      addProduct(product); // Add new product
    }

    setName('');
    setDescription('');
    setImages([]);
    setSuccessMessage('Product has been saved successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/details');
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div className="content">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {!id && ( // Show file input only if adding a new product
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        )}
        <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
      </form>
      {images.length > 0 && !id && ( // Only show new images if adding a product
        <div>
          <h3>Selected Images:</h3>
          <div className="image-previews">
            {images.map((image, index) => (
              <div key={index} className="image-preview-container">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  style={{ width: '100px', marginRight: '10px' }}
                />
                <p>{image.substring(0, 30)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {existingImages.length > 0 && ( // Show existing images if editing
        <div>
          <h3>Existing Images:</h3>
          <div className="image-previews">
            {existingImages.map((image, index) => (
              <div key={index} className="image-preview-container">
                <img
                  src={image}
                  alt={`Existing Preview ${index}`}
                  style={{ width: '100px', marginRight: '10px' }}
                />
                <p>{image.substring(0, 30)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ProductDetailsForm;
