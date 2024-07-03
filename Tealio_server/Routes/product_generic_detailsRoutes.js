
// routes/productGenericDetailsRoutes.js
const express = require('express');
const router = express.Router();

const { addProductCompleteDetails, 
    updateProductGenericDetails, 
    deleteProductGenericDetails, 
    showProductGenericDetails, 
    showAllProductGenericDetails } = require('../Controller/product_generic_detailsController');
    
    router.post('/', async (req, res) => {
      const { product_name, product_discription, product_images } = req.body;
  
      console.log('Request body:', req.body); // Log the entire request body
      console.log('Product Name:', product_name); // Log product_name
      console.log('Product Description:', product_discription); // Log product_discription
      console.log('Product Images:', product_images); // Log product_images
  
      if (!product_name) {
          return res.status(400).json({ error: 'Product name is required' });
      }
      if (!product_discription) {
          return res.status(400).json({ error: 'Product description is required' });
      }
      if (!product_images || !Array.isArray(product_images)) {
          return res.status(400).json({ error: 'Product images must be an array' });
      }
  
      try {
          const result = await addProductCompleteDetails(product_name, product_discription,product_images);
          res.json(result);
      } catch (err) {
          res.status(500).send(err.message);
      }
  });
  

// Update a product
router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { product_name, product_description } = req.body;
  try {
    await updateProductGenericDetails(productId, product_name, product_description);
    res.send('Product updated successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a product
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    await deleteProductGenericDetails(productId);
    res.send('Product deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Show a product
router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const result = await showProductGenericDetails(productId);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Show all products
router.get('/', async (req, res) => {
  try {
    const result = await showAllProductGenericDetails();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

