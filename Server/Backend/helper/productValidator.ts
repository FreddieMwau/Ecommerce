import Joi from 'joi'

export const productsSchema= Joi.object({
    product_name: Joi.string().required(),
    product_image_url: Joi.string().required(),
    product_description: Joi.string().required(),
    product_price: Joi.string().required(),
    product_in_stock: Joi.number().required(),
    product_category: Joi.number().required()
})