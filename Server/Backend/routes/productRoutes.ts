import express from 'express'
import { deleteProduct, getAllProducts, getCategoryProducts, getProduct, newProduct, updateProduct } from '../controllers/productController'
import { verifyToken } from '../middleware/jwtVerify'
const productRouter = express.Router()

productRouter.post('/newproduct', verifyToken, newProduct)
productRouter.get('/',  getAllProducts)
productRouter.get('/category/:product_category', getCategoryProducts)
productRouter.get('/:product_id', getProduct)
productRouter.delete('/:product_id', deleteProduct)
productRouter.patch('/:product_id', updateProduct)

export default productRouter