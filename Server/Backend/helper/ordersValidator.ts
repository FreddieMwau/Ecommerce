import Joi from 'joi'

export const ordersSchema = Joi.object({
    product_id: Joi.string().required(),
    customer_id: Joi.string().required(),
    quantity_ordered: Joi.number().required(),
    total_price: Joi.number().required(),
})