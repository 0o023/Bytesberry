import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      console.log("File converted to base64 successfully.");
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      console.error("Error converting file to base64:", error);
      reject(error);
    };
    
    reader.readAsDataURL(file);
  });
};

// Helper function to convert data URL to file
export const dataURLtoFile = (dataurl, filename) => {
  try {
    if (!dataurl) {
      console.error("No data URL provided.");
      return null;
    }
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error occurred while converting data URL to file: ", error);
    return null;
  }
};
const ProductDetailsForm = ({ products, addProduct, updateProduct }) => {
  const [product_name, setProductName] = useState('');
  const [product_discription, setProductDiscription] = useState('');
  const [product_images, setProductImages] = useState([]);
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
        setProductName(product.product_name);
        setProductDiscription(product.product_discription);
        setExistingImages(product.product_images || []); // Set existing images
      }
    }
  }, [id, products]);

  const handleFileChange = async (e) => {
    if (id) return; // Prevent adding new images if editing

    const files = e.target.files;
    setErrorMessage('');

    const imagePromises = Array.from(files).map(async (file) => {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width or height in pixels
          useWebWorker: true, // Use web worker for faster compression
        });

        // Convert the compressed file to base64
        const base64 = await convertToBase64(compressedFile);
        return { url: base64 }; // Format as { url: base64 }
      } catch (error) {
        console.error('Error compressing file:', error);
        throw new Error('Error compressing file');
      }
    });

    try {
      const images = await Promise.all(imagePromises);
      setProductImages(images);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
      setErrorMessage('Error converting images to Base64.');
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
      product_images: id ? existingImages : product_images,
    };

    try {
        const response = await axios.post('http://localhost:5000/product_generic_details', product, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    
        setSuccessMessage('Product has been saved successfully!');
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error saving the product.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
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
        {!id && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        )}
        <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
      </form>
      {images.length > 0 && !id && (
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
      {existingImages.length > 0 && id && (
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
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
export default ProductDetailsForm;

/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper function to convert data URL to file
export const dataURLtoFile = (dataurl, filename) => {
  try {
    if (!dataurl) {
      console.error("No data URL provided.");
      return null;
    }
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    console.log("image converted successfully");
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error occurred while converting data URL to file: ", error);
    return null;
  }
};

const ProductDetailsForm = ({ products, addProduct, updateProduct }) => {
  const [product_name, setProductName] = useState('');
  const [product_discription, setProductDiscription] = useState('');
  const [product_images, setProductImages] = useState([]);
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
        setProductName(product.product_name);
        setProductDiscription(product.product_discription);
        setExistingImages(product.product_images || []); // Set existing images
      }
    }
  }, [id, products]);

  const handleFileChange = async (e) => {
    if (id) return; // Prevent adding new images if editing

    const files = e.target.files;
    setErrorMessage('');

    const imagePromises = Array.from(files).map(async (file) => {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width or height in pixels
          useWebWorker: true, // Use web worker for faster compression
        });

        // Convert the compressed file to base64
        const base64 = await convertToBase64(compressedFile);
        return { url: base64 }; // Format as { url: base64 }
      } catch (error) {
        console.error('Error compressing file:', error);
        throw new Error('Error compressing file');
      }
    });

    try {
      const images = await Promise.all(imagePromises);
      setProductImages(images);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
      setErrorMessage('Error converting images to Base64.');
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
      product_images: id ? existingImages : product_images,
    };

    try {
      const response = await axios.post('http://localhost:5000/product_generic_details', product);

      if (response.data.success) {
        setSuccessMessage('Product has been saved successfully!');
      } else {
        setErrorMessage('Failed to save the product.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error saving the product.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
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
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={product_discription}
          onChange={(e) => setProductDiscription(e.target.value)}
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
      {product_images.length > 0 && !id && ( // Only show new images if adding a product
        <div>
          <h3>Selected Images:</h3>
          <div className="image-previews">
            {product_images.map((image, index) => (
              <div key={index} className="image-preview-container">
                <img
                  src={image.url}
                  alt={`Preview ${index}`}
                  style={{ width: '100px', marginRight: '10px' }}
                />
                <p>{image.url.substring(0, 30)}...</p>
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
                  src={image.url}
                  alt={`Existing Preview ${index}`}
                  style={{ width: '100px', marginRight: '10px' }}
                />
                <p>{image.url.substring(0, 30)}...</p>
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

export default ProductDetailsForm;*/

/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper function to convert data URL to file
export const dataURLtoFile = (dataurl, filename) => {
  try {
    if (!dataurl) {
      console.error("No data URL provided.");
      return null;
    }
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error occurred while converting data URL to file: ", error);
    return null;
  }
};

const ProductDetailsForm = ({ products, addProduct, updateProduct }) => {
  const [product_name, setProductName] = useState('');
  const [product_discription, setProductDiscription] = useState('');
  const [product_images, setProductImages] = useState([]);
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
        setProductName(product.product_name);
        setProductDiscription(product.product_discription);
        setExistingImages(product.product_images || []); // Set existing images
      }
    }
  }, [id, products]);

  const handleFileChange = async (e) => {
    if (id) return; // Prevent adding new images if editing

    const files = e.target.files;
    setErrorMessage('');

    const imagePromises = Array.from(files).map(async (file) => {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width or height in pixels
          useWebWorker: true, // Use web worker for faster compression
        });

        // Convert the compressed file to base64
        const base64 = await convertToBase64(compressedFile);
        return base64;
      } catch (error) {
        console.error('Error compressing file:', error);
        throw new Error('Error compressing file');
      }
    });

    try {
      const base64Images = await Promise.all(imagePromises);
      setProductImages(base64Images);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
      setErrorMessage('Error converting images to Base64.');
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
      product_images: id ? existingImages : product_images,
    };

    try {
      const response = await axios.post('http://localhost:5000/product_generic_details', product);

      if (response.data.success) {
        setSuccessMessage('Product has been saved successfully!');
      } else {
        setErrorMessage('Failed to save the product.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error saving the product.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
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
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={product_discription}
          onChange={(e) => setProductDiscription(e.target.value)}
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
      {product_images.length > 0 && !id && ( // Only show new images if adding a product
        <div>
          <h3>Selected Images:</h3>
          <div className="image-previews">
            {product_images.map((image, index) => (
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

export default ProductDetailsForm;*/

/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

// Helper function to convert files to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

// Helper function to convert data URL to file
export const dataURLtoFile = (dataurl, filename) => {
  try {
    if (!dataurl) {
      console.error("No data URL provided.");
      return null;
    }
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    console.error("Error occurred while converting data URL to file: ", error);
    return null;
  }
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

    const imagePromises = Array.from(files).map(async (file) => {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width or height in pixels
          useWebWorker: true, // Use web worker for faster compression
        });

        // Convert the compressed file to base64
        const base64 = await convertToBase64(compressedFile);
        return base64;
      } catch (error) {
        console.error('Error compressing file:', error);
        throw new Error('Error compressing file');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const product = {
      name,
      description,
      images: id ? existingImages : images,
    };

    try {
      const response = await axios.post('http://localhost:5000/product_generic_details', product);

      if (response.data.success) {
        setSuccessMessage('Product has been saved successfully!');
      } else {
        setErrorMessage('Failed to save the product.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error saving the product.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
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

export default ProductDetailsForm;*/

/*import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

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

    const imagePromises = Array.from(files).map(async (file) => {
      try {
        // Compress the image
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 1, // Max size in MB
          maxWidthOrHeight: 1920, // Max width or height in pixels
          useWebWorker: true, // Use web worker for faster compression
        });

        // Convert the compressed file to base64
        const base64 = await convertToBase64(compressedFile);
        return base64;
      } catch (error) {
        console.error('Error compressing file:', error);
        throw new Error('Error compressing file');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in all fields.');
      return;
    }

    const product = {
      name,
      description,
      images: id ? existingImages : images,
    };

    try {
      const response = await axios.post('http://localhost:5000/product_generic_details', product);

      if (response.data.success) {
        setSuccessMessage('Product has been saved successfully!');
      } else {
        setErrorMessage('Failed to save the product.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error saving the product.');
    }

    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
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

export default ProductDetailsForm;*/