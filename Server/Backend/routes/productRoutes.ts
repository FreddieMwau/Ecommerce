import express from 'express'
import { deleteProduct, getAllProducts, getCategoryProducts, getProduct, getProductCount, newProduct, updateProduct } from '../controllers/productController'
import { verifyToken } from '../middleware/jwtVerify'
const productRouter = express.Router()

productRouter.post('/newproduct', newProduct)
productRouter.get('/',  getAllProducts)
productRouter.get('/products', getProductCount)
productRouter.get('/category/:product_category', getCategoryProducts)
productRouter.get('/:product_id', getProduct)
productRouter.patch('/:product_id', deleteProduct)
productRouter.patch('/product/:product_id', updateProduct)

export default productRouter