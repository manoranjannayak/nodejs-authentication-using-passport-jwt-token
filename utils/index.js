const Joi = require('@hapi/joi')

let userValidation= data => {
    const schema = Joi.object(
        {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    )
    return schema.validate(data)
}

let loginValidation= data => {
    const schema = Joi.object(
        {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    )
    return schema.validate(data)
}

let postValidation= data => {
    const schema = Joi.object(
        {
            title: Joi.string().required(),
            body: Joi.string().required(),
            createdBy: Joi.string().required(),
            status: Joi.string().required(),
            location: Joi.any()
        }
    )
    return schema.validate(data)
}

module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation
module.exports.postValidation = postValidation