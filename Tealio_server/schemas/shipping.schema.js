const Joi = require('joi');

const trackingSchema = Joi.object({
    //tracking_id: Joi.number().integer().required(),
    order_id: Joi.number().integer().required(),
    awb_tracking_no: Joi.string().required()
});

module.exports = {
    trackingSchema
};
