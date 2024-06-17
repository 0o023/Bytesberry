const express = require('express');
const router = express.Router();
const { getCartItems, addCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartControllers');

router.get('/', getCartItems);
router.post('/', addCartItem);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;