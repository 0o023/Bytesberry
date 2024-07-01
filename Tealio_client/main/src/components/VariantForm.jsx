// VariantForm.jsx
import React from 'react';

const VariantForm = ({ variantName, variantPrice, handleVariantNameChange, handleVariantPriceChange, handleVariantFileChange, handleAddVariant }) => {
    return (
        <div className="form-container">
            <h2>Add Product Variant</h2>
            <input
                type="text"
                placeholder="Variant Name"
                value={variantName}
                onChange={handleVariantNameChange}
            />
            <input
                type="text"
                placeholder="Variant Price"
                value={variantPrice}
                onChange={handleVariantPriceChange}
            />
            <input type="file" onChange={handleVariantFileChange} />
            <button onClick={handleAddVariant}>Add Variant</button>
        </div>
    );
};

export default VariantForm;
