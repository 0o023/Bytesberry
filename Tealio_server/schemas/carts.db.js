const Joi = require('joi');

const addToCartSchema = Joi.object({
  product_name: Joi.string().max(255).required(),
  size: Joi.string().max(50).required(),
  price: Joi.number().precision(2).required(),
  quantity: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('In cart', 'Ordered', 'Shipped', 'Delivered').optional(),
  added_at: Joi.date().optional(),
  user_id: Joi.number().integer().required()  // New user_id field
});

const getCartSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const deleteCartSchema = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = {
  addToCartSchema,
  getCartSchema,
  deleteCartSchema,
};
