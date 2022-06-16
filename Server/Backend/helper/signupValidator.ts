import Joi from 'joi'

export const signUpSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required().email(),
    customer_password: Joi.string().required().min(5).max(25)
})