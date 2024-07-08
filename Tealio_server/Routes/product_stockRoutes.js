const express = require('express');
const router = express.Router();

const { addProductStock, updateProductStock, deleteProductStock, showProductStock, showAllProductStock } = require('../Controller/product_stockController');

// Add a product stock
router.post('/', async (req, res) => {
    const { product_id, size_variety_id, stock_quantity } = req.body;
    console.log('Request body:', req.body); // Log the entire request body
    console.log('Product ID:', product_id); // Log product_id
    console.log('Size Variety ID:', size_variety_id); // Log size_variety_id
    console.log('Stock Quantity:', stock_quantity); // Log stock_quantity

    if (!product_id) {
        return res.status(400).json({ error: 'Product ID is required' });
    }
    if (!size_variety_id) {
        return res.status(400).json({ error: 'Size Variety ID is required' });
    }
    if (!stock_quantity) {
        return res.status(400).json({ error: 'Stock Quantity is required' });
    }
    try {
        const result = await addProductStock(product_id, size_variety_id, stock_quantity);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Update a product stock
router.put('/:stockId', async (req, res) => {
    const { stockId } = req.params;
    const { product_id, size_variety_id, stock_quantity } = req.body;
    try {
        await updateProductStock(stockId, product_id, size_variety_id, stock_quantity);
        res.send('Product stock updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a product stock
router.delete('/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        await deleteProductStock(stockId);
        res.send('Product stock deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show a product stock
router.get('/:stockId', async (req, res) => {
    const { stockId } = req.params;
    try {
        const result = await showProductStock(stockId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show all product stocks
router.get('/', async (req, res) => {
    try {
        const result = await showAllProductStock();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;