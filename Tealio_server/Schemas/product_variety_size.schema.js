
// Schemas/product_variety_size.schema.js
const Joi = require('joi');

const addProductVarietySizeSchema = Joi.object({
  product_id: Joi.number().integer().positive().required(),
  size_name: Joi.string().required(),
});

module.exports = { addProductVarietySizeSchema };