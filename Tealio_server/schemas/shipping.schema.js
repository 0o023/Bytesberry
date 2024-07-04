const Joi = require('joi');

const trackingSchema = Joi.object({
    order_id: Joi.number().integer().required(),
    awb_tracking_no: Joi.string().allow(null, '').default('0')
});

module.exports = {
    trackingSchema
};
