const Joi = require('joi');




module.exports = {
    addCombosSecSchema: {
        body: Joi.object().required().keys({
            title: Joi.string().required(),
            over_view: Joi.string().required(),
            price: Joi.number().required(),
            img_src: Joi.optional(),
        })
    }
}