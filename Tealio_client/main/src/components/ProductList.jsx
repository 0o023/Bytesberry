// ProductList.jsx
import React, { useState } from 'react';

const ProductList = ({ products, handleDeleteProduct }) => {
    const [expandedIndex, setExpandedIndex] = useState(-1);

    const toggleBase64 = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand otherwise
        }
    };

    const toggleVariant = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(-1); // Collapse if already expanded
        } else {
            setExpandedIndex(index); // Expand otherwise
        }
    };

    return (
        <div className="product-list">
            <h2>Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <img src={product.image} alt={product.name} width="100" />
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(index)}>Delete</button>
                                    <button onClick={() => toggleBase64(index)}>Show Base64</button>
                                    <button onClick={() => toggleVariant(index)}>Toggle Variant</button>
                                </td>
                            </tr>
                            {expandedIndex === index && (
                                <tr>
                                    <td colSpan="4">
                                        <textarea
                                            rows="4"
                                            cols="50"
                                            value={product.image}
                                            readOnly
                                            style={{ width: '100%', marginTop: '10px' }} // Adjust styles as needed
                                        />
                                    </td>
                                </tr>
                            )}
                            {expandedIndex === index && (
                                <tr>
                                    <td colSpan="4">
                                        <div>
                                            <h3>Variant</h3>
                                            <p>{product.variant}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
