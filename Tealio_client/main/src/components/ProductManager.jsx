// ProductManager.jsx
import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import ProductImageList from './ProductImageList';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [productImages, setProductImages] = useState([]);

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.error('Error: ', error);
        };
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file, (base64) => {
                setProductImage(base64);
            });
        }
    };

    const handleAddProduct = () => {
        if (productName && productPrice && productImage) {
            const newProduct = {
                name: productName,
                price: productPrice,
                image: productImage
            };
            setProducts([...products, newProduct]);
            setProductImages([...productImages, { productName, base64: productImage }]);
            setProductName('');
            setProductPrice('');
            setProductImage(null);
        } else {
            alert('Please fill in all fields and select an image.');
        }
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
    };

    return (
        <div className="container">
            <h1 className="heading">Product Manager</h1>
            <ProductForm
                productName={productName}
                productPrice={productPrice}
                handleProductNameChange={(e) => setProductName(e.target.value)}
                handleProductPriceChange={(e) => setProductPrice(e.target.value)}
                handleFileChange={handleFileChange}
                handleAddProduct={handleAddProduct}
            />
            <ProductList products={products} handleDeleteProduct={handleDeleteProduct} />
            <ProductImageList productImages={productImages} />
        </div>
    );
};

export default ProductManager;
