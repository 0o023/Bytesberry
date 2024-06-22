const Joi=require('joi');

const productDetailsSchema = Joi.object({
  product_name: Joi.string().required(),
  size:Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().integer().min(0).required()
});

// Define the schema for the add to cart request
const addToCartSchema = Joi.object({
  orderno: Joi.number().integer().required(),
  productdetails: Joi.array().items(productDetailsSchema).required()
});

const deleteCartSchema = Joi.object({
  orderno: Joi.number().integer().required()
});


const getCartSchema = Joi.object({
  orderno: Joi.number().integer().required()
});

module.exports={
    addToCartSchema,
    deleteCartSchema,
    getCartSchema,
};