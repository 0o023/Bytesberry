
const pool = require('../db/pool');

const addProductPrice = async (productId, sizeVarietyId, price, discountPercentage) => {
    try {
        const result = await pool.query(
            'SELECT add_product_price($1, $2, $3, $4)',
            [productId, sizeVarietyId, price, discountPercentage]
        );
        return result.rows[0]; // Return the inserted product price
    } catch (err) {
        console.error('Error adding product price:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const updateProductPrice = async (priceId, productId, sizeVarietyId, price, discountPercentage) => {
    try {
        await pool.query(
            'SELECT update_product_price($1, $2, $3, $4, $5)',
            [priceId, productId, sizeVarietyId, price, discountPercentage]
        );
        console.log('Product price updated successfully');
    } catch (err) {
        console.error('Error updating product price:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const deleteProductPrice = async (priceId) => {
    try {
        await pool.query(
            'SELECT delete_product_price($1)',
            [priceId]
        );
        console.log('Product price deleted successfully');
    } catch (err) {
        console.error('Error deleting product price:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showProductPrice = async (priceId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_product_price($1)',
            [priceId]
        );
        return result.rows[0]; // Return the found product price
    } catch (err) {
        console.error('Error showing product price:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showAllProductPrices = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_all_product_price()'
        );
        return result.rows; // Return all product prices
    } catch (err) {
        console.error('Error showing all product prices:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

module.exports = { addProductPrice, updateProductPrice, deleteProductPrice, showProductPrice, showAllProductPrices };