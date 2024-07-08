const express = require('express');
const router = express.Router();

const { 
    addProductCompleteDetails, 
    updateProductGenericDetails, 
    deleteProductGenericDetails, 
    showProductGenericDetails, 
    showAllProductGenericDetails 
} = require('../Controller/product_generic_detailsController');

// Add a product
router.post('/', async (req, res) => {
    const { product_name, product_discription, product_images } = req.body;

    console.log('Request body:', req.body); // Log the entire request body

    // Validate inputs
    if (!product_name || typeof product_name !== 'string' || !product_discription || typeof product_discription !== 'string' || !Array.isArray(product_images)) {
        return res.status(400).json({ error: 'Invalid input: product_name (string), product_discription (string), and product_images (array) are required' });
    }

    try {
        const result = await addProductCompleteDetails(product_name, product_discription, product_images);
        res.json(result);
    } catch (err) {
        console.error('Error adding product details:', err.message);
        res.status(500).send('Error adding product details: ' + err.message);
    }
});

// Update a product
router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { product_name, product_discription } = req.body;

    // Validate inputs
    if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ error: 'Invalid productId' });
    }
    if (!product_name || typeof product_name !== 'string' || !product_discription || typeof product_discription !== 'string') {
        return res.status(400).json({ error: 'Invalid input: product_name and product_discription are required' });
    }

    try {
        await updateProductGenericDetails(Number(productId), product_name, product_discription);
        res.send('Product updated successfully');
    } catch (err) {
        console.error('Error updating product details:', err.message);
        res.status(500).send('Error updating product details: ' + err.message);
    }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;

    // Ensure productId is a number
    const id = Number(productId);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        await deleteProductGenericDetails(id);
        res.send('Product deleted successfully');
    } catch (err) {
        console.error('Error deleting product details:', err.message);
        res.status(500).send('Error deleting product details: ' + err.message);
    }
});

// Show a product
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    // Validate productId
    const id = Number(productId);
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    try {
        const result = await showProductGenericDetails(id);
        res.json(result);
    } catch (err) {
        console.error('Error retrieving product details:', err.message);
        res.status(500).send('Error retrieving product details: ' + err.message);
    }
});

// Show all products
router.get('/', async (req, res) => {
    try {
        const result = await showAllProductGenericDetails();
        res.json(result);
    } catch (err) {
        console.error('Error retrieving all products:', err.message);
        res.status(500).send('Error retrieving all products: ' + err.message);
    }
});

module.exports = router;
