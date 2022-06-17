import express from 'express'
import { deleteProduct, getAllProducts, getCategoryProducts, getProduct, newProduct, updateProduct } from '../controllers/productController'
import { verifyToken } from '../middleware/jwtVerify'
const productRouter = express.Router()

productRouter.post('/newproduct', verifyToken, newProduct)
productRouter.get('/', verifyToken,  getAllProducts)
productRouter.get('/category/:product_category', verifyToken, getCategoryProducts)
productRouter.get('/:product_id', verifyToken, getProduct)
productRouter.delete('/:product_id', verifyToken, deleteProduct)
productRouter.patch('/:product_id', verifyToken, updateProduct)

export default productRouter