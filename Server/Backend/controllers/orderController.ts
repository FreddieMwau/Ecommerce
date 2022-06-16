import { v1 as uid } from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import dotenv from 'dotenv'
import { RequestHandler } from 'express'
import { ordersSchema } from '../helper/ordersValidator'
dotenv.config()

export const newOrders: RequestHandler = async (req, res) => {
    try{
        const order_id = uid()
        const { product_id, customer_id, quantity_ordered, total_price } = req.body as { product_id: string, customer_id: string, quantity_ordered: number, total_price: number }

        const {error} = ordersSchema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        let dbPool = await mssql.connect(sqlConfig)
        const order = await dbPool.request()
            .input('order_id', mssql.VarChar, order_id)
            .input('product_id', mssql.VarChar, product_id)
            .input('customer_id', mssql.VarChar, customer_id)
            .input('quantity_ordered', mssql.Int, quantity_ordered)
            .input('total_price', mssql.Int, total_price)
            .execute('addOrder')

        res.status(200)
            .json({message:'Order added successfully', order})

    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getAllOrders: RequestHandler = async(req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const orders = await dbPool.request()
            .execute('getAllOrders')
        res.status(200)
            .json(orders.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getOrder: RequestHandler<{ order_id:string }> = async(req, res)=>{
    try{
        const order_id = req.params.order_id
        let dbPool = await mssql.connect(sqlConfig)
        const order = await dbPool.request()
            .input('order_id', mssql.VarChar, order_id)
            .execute('getOrderById')
        if(!order.recordset[0]){
            return res.json({message: `Order with id:: ${order_id} does not exist`})
        }
        res.status(200)
            .json(order.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}