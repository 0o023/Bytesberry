// Server side validation using happi joi 
/*
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

*/

const Joi = require('joi');

const Validation = Joi.object({
    order_date: Joi.date().required(),
    billing_add: Joi.string().required(),
    payment_mode: Joi.string().valid('Cod', 'Credit Card', 'Net Banking').required(),
    order_status: Joi.string().valid('initiated', 'shipped', 'delivered').required(),
    order_delivered_date: Joi.date().optional(),
    order_no: Joi.number().required(),
    payment_status: Joi.string().required(),
    order_total: Joi.number().required(),
    customer_email: Joi.string().required(),
    customer_phone_no: Joi.number().required()
});

module.exports = {
    Validation
};
