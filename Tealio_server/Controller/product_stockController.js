const pool = require('../db/pool');

const addProductStock = async (productId, sizeVarietyId, stockQuantity) => {
    try {
        const result = await pool.query(
            'SELECT add_product_stock($1, $2, $3)',
            [productId, sizeVarietyId, stockQuantity]
        );
        return result.rows[0]; // Return the inserted product stock
    } catch (err) {
        console.error('Error adding product stock:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const updateProductStock = async (stockId, productId, sizeVarietyId, stockQuantity) => {
    try {
        await pool.query(
            'SELECT update_product_stock($1, $2, $3, $4)',
            [stockId, productId, sizeVarietyId, stockQuantity]
        );
        console.log('Product stock updated successfully');
    } catch (err) {
        console.error('Error updating product stock:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const deleteProductStock = async (stockId) => {
    try {
        await pool.query(
            'SELECT delete_product_stock($1)',
            [stockId]
        );
        console.log('Product stock deleted successfully');
    } catch (err) {
        console.error('Error deleting product stock:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showProductStock = async (stockId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_product_stock($1)',
            [stockId]
        );
        return result.rows[0]; // Return the found product stock
    } catch (err) {
        console.error('Error showing product stock:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showAllProductStock = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_all_product_stock()'
        );
        return result.rows; // Return all product stocks
    } catch (err) {
        console.error('Error showing all product stock:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

module.exports = { addProductStock, updateProductStock, deleteProductStock, showProductStock, showAllProductStock };
