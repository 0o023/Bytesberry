// ProductForm.jsx
import React from 'react';

const ProductForm = ({ productName, productPrice, handleProductNameChange, handleProductPriceChange, handleFileChange, handleAddProduct }) => {
    return (
        <div className="form-container">
            <h2>Add Product</h2>
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={handleProductNameChange}
            />
            <input
                type="text"
                placeholder="Product Price"
                value={productPrice}
                onChange={handleProductPriceChange}
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default ProductForm;
