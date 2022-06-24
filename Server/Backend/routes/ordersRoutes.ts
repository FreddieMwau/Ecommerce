import express from 'express'
import { deleteOrder, getAllOrders, getOrder, getOrderByUserId, getOrderCount, newOrders, updateOrder } from '../controllers/orderController'

const orderRouter = express.Router()

orderRouter.post('/neworder', newOrders)
orderRouter.get('/', getAllOrders)
orderRouter.get('/orders', getOrderCount)
orderRouter.get('/:order_id', getOrder)
orderRouter.get('/user/:customer_id', getOrderByUserId)
orderRouter.delete('/order/:order_id', deleteOrder)
orderRouter.patch('/:order_id', updateOrder)

export default orderRouter