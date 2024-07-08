const express = require('express');
const router = express.Router();
const { addProductVarietySize, 
        updateProductVarietySize, 
        deleteProductVarietySize, 
        showProductVarietySize, 
        showAllProductVarietySize } = require('../Controller/product_variant_sizeController');

// Add a new product variety size
router.post('/', async (req, res) => {
    const { product_id, size_name } = req.body;
    console.log('Request body:', req.body); // Log the entire request body
    console.log('Product ID:', product_id); // Log product_id
    console.log('Size Name:', size_name); // Log size_name
    
    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }
    if (!size_name) {
        return res.status(400).json({ error: 'Size name is required' });
    }
    try {
        const result = await addProductVarietySize(product_id, size_name);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a product variety size
router.put('/:sizeVarietyId', async (req, res) => {
    const { sizeVarietyId } = req.params;
    const { product_id, size_name } = req.body;
    try {
        await updateProductVarietySize(sizeVarietyId, product_id, size_name);
        res.send('Product variety size updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a product variety size
router.delete('/:sizeVarietyId', async (req, res) => {
    const { sizeVarietyId } = req.params;
    try {
        await deleteProductVarietySize(sizeVarietyId);
        res.send('Product variety size deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show a product variety size
router.get('/:sizeVarietyId', async (req, res) => {
    const { sizeVarietyId } = req.params;
    try {
        const result = await showProductVarietySize(sizeVarietyId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show all product variety sizes
router.get('/', async (req, res) => {
    try {
        const result = await showAllProductVarietySize();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
