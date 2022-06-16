import express from 'express'
import { getAllOrders, getOrder, newOrders } from '../controllers/orderController'

const orderRouter = express.Router()

orderRouter.post('/neworder', newOrders)
orderRouter.get('/', getAllOrders)
orderRouter.get('/:id', getOrder)

export default orderRouter