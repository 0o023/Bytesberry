
// Controller/product_generic_detailsController.js

const pool = require('../db/pool');
const addProductCompleteDetails = async (productName, productDescription, productImages) => {
    try {
        console.log(productName);
        console.log(productDescription);
        console.log(productImages);
        
        const result = await pool.query(
            'SELECT add_product_complete_details($1, $2, $3)',
            [productName, productDescription, JSON.stringify(productImages)]
        );

        return result.rows[0]; // Return the result of the function call
    } catch (err) {
        console.error('Error adding complete product details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const updateProductGenericDetails = async (productId, productName, productDescription) => {
    try {
        await pool.query(
            'SELECT update_product_generic_details($1, $2, $3)',
            [productId, productName, productDescription]
        );
        console.log('Product generic details updated successfully');
    } catch (err) {
        console.error('Error updating product generic details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const deleteProductGenericDetails = async (productId) => {
    try {
        await pool.query(
            'SELECT delete_product_generic_details($1)',
            [productId]
        );
        console.log('Product generic details deleted successfully');
    } catch (err) {
        console.error('Error deleting product generic details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showProductGenericDetails = async (productId) => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_product_generic_details($1)', 
            [productId]
        );
        return result.rows[0]; // Return the found product
    } catch (err) {
        console.error('Error showing product generic details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showAllProductGenericDetails = async () => {
    try {
        const result = await pool.query(
            'SELECT * FROM show_all_product_generic_details()'
        );
        return result.rows; // Return all products
    } catch (err) {
        console.error('Error showing all product generic details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

module.exports = { addProductCompleteDetails, updateProductGenericDetails, deleteProductGenericDetails, showProductGenericDetails, showAllProductGenericDetails };
