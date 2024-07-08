// Schemas/product_stock.schema.js
const Joi = require('joi');

const addProductStockSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  size_variety_id: Joi.number().integer().positive().required(),
  stock_quantity: Joi.number().integer().positive().required(),
});

module.exports = { addProductStockSchema };