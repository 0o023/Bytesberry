const pool = require('../db/pool');

const addProductVarietySize = async (productId, sizeName) => {
    try {
        const result = await pool.query(
            'SELECT * FROM add_product_variety_size($1, $2)',
            [productId, sizeName]
        );
        return result.rows[0]; // Return the inserted product variety size
    } catch (err) {
        console.error('Error adding product variety size:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const updateProductVarietySize = async (sizeVarietyId, productId, sizeName) => {
    try {
        await pool.query(
            'SELECT update_product_variety_size($1, $2, $3)',
            [sizeVarietyId, productId, sizeName]
        );
        console.log('Product variety size updated successfully');
    } catch (err) {
        console.error('Error updating product variety size:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const deleteProductVarietySize = async (sizeVarietyId) => {
    try {
        await pool.query(
            'SELECT delete_product_variety_size($1)',
            [sizeVarietyId]
        );
        console.log('Product variety size deleted successfully');
    } catch (err) {
        console.error('Error deleting product variety size:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showProductVarietySize = async (sizeVarietyId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_product_variety_size($1)', 
            [sizeVarietyId]
        );
        return result.rows[0]; // Return the found product variety size
    } catch (err) {
        console.error('Error showing product variety size:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showAllProductVarietySize = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_all_product_variety_size()'
        );
        return result.rows; // Return all product variety sizes
    } catch (err) {
        console.error('Error showing all product variety sizes:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

module.exports = { addProductVarietySize, updateProductVarietySize, deleteProductVarietySize, showProductVarietySize, showAllProductVarietySize };
