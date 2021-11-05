const Joi = require('joi');




module.exports = {
    addDealsSecSchema: {
        body: Joi.object().required().keys({
           
            over_view: Joi.string().required(),
            price: Joi.number().required(),
           
        })
    }
}