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