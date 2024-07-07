const Joi=require('joi');

const productDetailsSchema = Joi.object({
  product_name: Joi.string().required(),
  productid: Joi.number().integer().required(),
  variety_id:Joi.number().integer().required(),
  size:Joi.number().integer().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().integer().min(0).required()
});

// Define the schema for the add to cart request
const addToCartSchema = Joi.object({
  orderno: Joi.number().integer().required(),
  productdetails: Joi.array().items(productDetailsSchema).required()
});

const deleteCartSchema = Joi.object({
  orderno: Joi.number().integer(),
  varietyid:Joi.number().integer().required()
});

const updateProductDetailsSchema = Joi.object({
  orderno: Joi.number().integer().required(),
  variety_id: Joi.number().integer().required(),
  new_details: productDetailsSchema.required()
})

const getCartSchema = Joi.object({
  orderno: Joi.number().integer().required()
});

module.exports={
    addToCartSchema,
    deleteCartSchema,
    getCartSchema,
    updateProductDetailsSchema
};