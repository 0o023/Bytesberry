// Server side validation using happi joi 

const Joi = require('joi');

// Define the schema for order validation
const orderSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  status: Joi.string().valid('initiated', 'shipped', 'delivered').required(),
  total_price: Joi.number().positive().required(),
  date_ordered: Joi.date().iso().required()

});

module.exports = {
  orderSchema
};
