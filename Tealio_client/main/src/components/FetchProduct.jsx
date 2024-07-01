import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fetch_images');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>
            <h3>{product.product_name}</h3>
            <p>{product.product_description}</p>
            <ul>
              {product.images.map(image => (
                <li key={image.file_id}>
                  <img src={image.file_url} alt="Product" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchProducts;
