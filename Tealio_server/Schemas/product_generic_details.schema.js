const Joi = require('joi');

const addProductCompleteDetailsValidation = Joi.object({
    product_name: Joi.string().max(255).required(),
    product_discription: Joi.string().max(5000).required(),
    p_images: Joi.array().items(
        Joi.object({
            url: Joi.string().uri().required()
        })
    ).min(1).required()
});

module.exports = {
    addProductCompleteDetailsValidation
};