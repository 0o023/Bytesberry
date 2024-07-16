// Schema/product_price.schema.js
const Joi = require('joi');

const addProductPriceSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  size_variety_id: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  discount_percentage: Joi.number().min(0).max(100).required()
});

module.exports = { addProductPriceSchema };