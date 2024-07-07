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
    customer_phone_no: Joi.number().required(),
    cart_items: Joi.array().items(Joi.object({
        orderno: Joi.string().required(),
        productdetails: Joi.array().items(Joi.object({
            price: Joi.number().required(),
            product_name: Joi.string().required(),
            productid: Joi.number().required(),
            quantity: Joi.number().required(),
            size: Joi.number().required(),
            variety_id: Joi.number().required()
        })).required()
    })).required()
});



const OrderDetailsSchema = Joi.object({
    orderid: Joi.number().integer().required(),
    cart_items: Joi.array().items(Joi.object({
        orderno: Joi.string().required(),
        productdetails: Joi.array().items(Joi.object({
            price: Joi.number().required(),
            product_name: Joi.string().required(),
            productid: Joi.number().required(),
            quantity: Joi.number().required(),
            size: Joi.number().required(),
            variety_id: Joi.number().required()
        })).required()
    })).required()
  });
module.exports = {
    Validation,
    OrderDetailsSchema
};