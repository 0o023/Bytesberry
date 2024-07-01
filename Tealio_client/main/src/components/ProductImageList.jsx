import React from 'react';

const ProductImageList = ({ productImages }) => {
    return (
        <div className="product-images">
            <h2>Product Images (Base64)</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Product Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>Base64 Data</th>
                    </tr>
                </thead>
                <tbody>
                    {productImages.map((image, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{image.productName}</td>
                            <td style={{ padding: '10px', textAlign: 'left', border: '1px solid #ccc' }}>{image.base64}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductImageList;
