const pool = require('../db/pool');

// Helper function to validate inputs
const validateProductDetails = (productName, productDescription, productImages) => {
    if (typeof productName !== 'string' || productName.trim() === '') {
        throw new Error('Invalid product name');
    }
    if (typeof productDescription !== 'string' || productDescription.trim() === '') {
        throw new Error('Invalid product description');
    }
    if (!Array.isArray(productImages)) {
        throw new Error('Invalid product images format');
    }
};

const addProductCompleteDetails = async (productName, productDescription, productImages) => {
    try {
        // Validate inputs
        validateProductDetails(productName, productDescription, productImages);

        console.log('Adding product details:', { productName, productDescription, productImages });

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
        if (!productId || isNaN(Number(productId))) {
            throw new Error('Invalid product ID');
        }
        validateProductDetails(productName, productDescription, []);

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
        if (!productId || isNaN(Number(productId))) {
            throw new Error('Invalid product ID');
        }

        // Begin a transaction
        await pool.query('BEGIN');

        // First, delete related records from utbl_product_variety_size
        await pool.query(
            'DELETE FROM utbl_product_variety_size WHERE product_id = $1',
            [Number(productId)]
        );

        // Then, delete the product from utbl_product_generic_details
        await pool.query(
            'DELETE FROM utbl_product_generic_details WHERE product_id = $1',
            [Number(productId)]
        );

        // Commit the transaction
        await pool.query('COMMIT');

        console.log('Product generic details and related records deleted successfully');
    } catch (err) {
        // Rollback the transaction in case of error
        await pool.query('ROLLBACK');
        console.error('Error deleting product generic details:', err.message);
        throw err; // Propagate the error to be handled by the caller
    }
};

const showProductGenericDetails = async (productId) => {
    try {
        if (!productId || isNaN(Number(productId))) {
            throw new Error('Invalid product ID');
        }

        const result = await pool.query(
            'SELECT * FROM show_product_generic_details($1)', 
            [Number(productId)] // Ensure productId is an integer
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

module.exports = { 
    addProductCompleteDetails, 
    updateProductGenericDetails, 
    deleteProductGenericDetails, 
    showProductGenericDetails, 
    showAllProductGenericDetails 
};
