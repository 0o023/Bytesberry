const express = require('express');
const router = express.Router();
const {
    updateProductImage,
    deleteProductImage,
    showProductImage,
    showAllProductImages
} = require('../Controller/product_imageController');

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const { file_urls } = req.body; // expecting an array of base64 strings

    try {
        await updateProductImage(productId, file_urls);
        res.send('Product images updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:fileId/:productId', async (req, res) => {
    const { fileId, productId } = req.params;

    try {
        await deleteProductImage(fileId, productId);
        res.send('Product image deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/:fileId', async (req, res) => {
    const { fileId } = req.params;

    try {
        const result = await showProductImage(fileId);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await showAllProductImages();
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
