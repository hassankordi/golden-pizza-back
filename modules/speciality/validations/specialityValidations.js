const Joi = require('joi');




module.exports = {
    addSpecialitySecSchema: {
        body: Joi.object().required().keys({
            title: Joi.string().required(),
            over_view: Joi.string().required(),
            smallPrice: Joi.number().required(),
            largePrice: Joi.number().required(),
            mediumPrice: Joi.number().required(),
            img_src: Joi.optional(),
        })
    }
}