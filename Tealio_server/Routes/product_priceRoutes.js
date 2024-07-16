const express = require('express');
const router = express.Router();

const { addProductPrice,
        updateProductPrice,
        deleteProductPrice,
        showProductPrice,
        showAllProductPrices } = require('../Controller/product_priceController');

// Add a product price
router.post('/', async (req, res) => {
    const { product_id, size_variety_id, price, discount_percentage } = req.body;
  
    if (product_id === undefined || size_variety_id === undefined || price === undefined || discount_percentage === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const result = await addProductPrice(product_id, size_variety_id, price, discount_percentage);
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// Update a product price
router.put('/:priceId', async (req, res) => {
    const { priceId } = req.params;
    const { product_id, size_variety_id, price, discount_percentage } = req.body;

    try {
        await updateProductPrice(priceId, product_id, size_variety_id, price, discount_percentage);
        res.send('Product price updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Delete a product price
router.delete('/:priceId', async (req, res) => {
    const { priceId } = req.params;

    try {
        await deleteProductPrice(priceId);
        res.send('Product price deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show a product price
router.get('/:priceId', async (req, res) => {
    const { priceId } = req.params;

    try {
        const result = await showProductPrice(priceId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Show all product prices
router.get('/', async (req, res) => {
    try {
        const result = await showAllProductPrices();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
