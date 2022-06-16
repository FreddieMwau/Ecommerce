import Joi from 'joi'

export const signInSchema = Joi.object({
    email : Joi.string().required().email(),
    customer_password: Joi.string().required().min(5).max(10)
})