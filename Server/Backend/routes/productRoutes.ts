import express from 'express'
import { deleteProduct, getAllProducts, getCategoryProducts, getProduct, newProduct, updateProduct } from '../controllers/productController'

const productRouter = express.Router()

productRouter.post('/newproduct', newProduct)
productRouter.get('/', getAllProducts)
productRouter.get('/:product_category', getCategoryProducts)
productRouter.get('/:product_id', getProduct)
productRouter.get('/:product_id', deleteProduct)
productRouter.get('/:product_id', updateProduct)

export default productRouter