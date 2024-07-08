const pool = require('../db/pool');

const updateProductImage = async (productId, fileUrls) => {
    try {
        await pool.query(
            'UPDATE products SET product_images = $2 WHERE id = $1',
            [productId, JSON.stringify(fileUrls)]
        );
        console.log('Product images updated successfully');
    } catch (err) {
        console.error('Error updating product images:', err.message);
        throw err;
    }
};

const deleteProductImage = async (fileId, productId) => {
    try {
        const product = await pool.query('SELECT product_images FROM products WHERE id = $1', [productId]);
        const updatedImages = product.rows[0].product_images.filter(img => img.id !== fileId);

        await pool.query(
            'UPDATE products SET product_images = $2 WHERE id = $1',
            [productId, JSON.stringify(updatedImages)]
        );
        console.log('Product image deleted successfully');
    } catch (err) {
        console.error('Error deleting product image:', err.message);
        throw err;
    }
};

const showProductImage = async (fileId) => {
    try {
        const result = await pool.query(
            'SELECT product_images FROM products WHERE id = $1',
            [fileId]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error showing product image:', err.message);
        throw err;
    }
};

const showAllProductImages = async () => {
    try {
        const result = await pool.query(
            'SELECT product_images FROM products'
        );
        return result.rows;
    } catch (err) {
        console.error('Error showing all product images:', err.message);
        throw err;
    }
};

module.exports = { updateProductImage, deleteProductImage, showProductImage, showAllProductImages };
