const { readCart, writeCart } = require('../schemas/cartSchema');

// Get all cart items
exports.getCartItems = (req, res) => {
  const cartItems = readCart();
  res.status(200).json(cartItems);
};

// Add a new cart item
exports.addCartItem = (req, res) => {
  const { name, price, quantity } = req.body;
  const cartItems = readCart();
  const newCartItem = { id: Date.now(), name, price, quantity };
  cartItems.push(newCartItem);
  writeCart(cartItems);
  res.status(201).json(newCartItem);
};

// Update cart item quantity
exports.updateCartItem = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const cartItems = readCart();
  const item = cartItems.find(item => item.id == id);
  if (item) {
    item.quantity = quantity;
    writeCart(cartItems);
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

// Delete a cart item
exports.deleteCartItem = (req, res) => {
  const { id } = req.params;
  let cartItems = readCart();
  const item = cartItems.find(item => item.id == id);
  if (item) {
    cartItems = cartItems.filter(item => item.id != id);
    writeCart(cartItems);
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};