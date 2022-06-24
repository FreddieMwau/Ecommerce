import { v1 as uid } from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import dotenv from 'dotenv'
import { RequestHandler } from 'express'
import { productsSchema } from '../helper/productValidator'
dotenv.config()


export const newProduct : RequestHandler = async (req, res) => {
    try {

        const product_id = uid()
        // const { product_name, product_image_url, product_description, product_price, product_in_stock, product_category } = req.body as { product_name: string, product_image_url: string, product_description: string, product_price: number, product_in_stock: number, product_category: string, }
        const {users, ...products} = req.body

        const { error } = productsSchema.validate(products)
        if(error){
            return res.json({error: error.details[0].message})
        }
    
        let dbPool = await mssql.connect(sqlConfig)
        const product = await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .input('product_name', mssql.VarChar, products.product_name)
            .input('product_image_url', mssql.VarChar, products.product_image_url)
            .input('product_description', mssql.VarChar, products.product_description)
            .input('product_price', mssql.Int, products.product_price)
            .input('product_in_stock', mssql.Int, products.product_in_stock)
            .input('product_category', mssql.VarChar, products.product_category)
            .execute('addProduct')

        res.status(200)
            .json({message: 'Product added successfully'})
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getAllProducts: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const products = await dbPool.request()
            .execute('getAllProducts')
        res.status(200)
            .json(products.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getCategoryProducts: RequestHandler<{ product_category: string }> = async (req,res) => {
    try{
        const product_category = req.params.product_category
        let dbPool = await mssql.connect(sqlConfig)
        const product = await dbPool.request()
            .input('product_category', mssql.VarChar, product_category)
            .execute('getCategoryProducts')
        if (!product.recordset[0]) {
            return res.json({ message: `Product category:: ${product_category} does not exist` })
        }
        res.status(200)
            .json(product.recordset)

    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getProduct: RequestHandler<{product_id:string}> = async (req, res) => {
    try{
        const product_id = req.params.product_id
        let dbPool = await mssql.connect(sqlConfig)
        const product = await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .execute('getProductById')
        if(!product.recordset[0]){
            return res.json({message: `Product with id:: ${product_id} does not exist`})
        }
        res.status(200)
            .json(product.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const deleteProduct: RequestHandler<{ product_id: string }> = async (req, res) => {
    try {
        const product_id = req.params.product_id
        let dbPool = await mssql.connect(sqlConfig)
        const product = await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .execute('getProductById')
        if (!product.recordset[0]) {
            return res.json({ message: `Product with id:: ${product_id} does not exist` })
        }
        await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .execute('deleteProduct')
        res.status(200)
            .json({message: `Product with id:: ${product_id} has been deleted successfully`})
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const updateProduct: RequestHandler<{ product_id: string }> = async (req, res) => {
    try{
        const product_id = req.params.product_id
        let dbPool = await mssql.connect(sqlConfig)
        // const { product_name, product_image_url, product_description, product_price, product_in_stock, product_category } = req.body as { product_name: string, product_image_url: string, product_description: string, product_price: number, product_in_stock: number, product_category: string, }
        const { users, ...products } = req.body

        const { error } = productsSchema.validate(products)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        const product = await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .execute('getProductById')
        if (!product.recordset[0]) {
            return res.json({ message: `Product with id:: ${product_id} does not exist` })
        }
        const updatedProduct = await dbPool.request()
            .input('product_id', mssql.VarChar, product_id)
            .input('product_name', mssql.VarChar, products.product_name)
            .input('product_image_url', mssql.VarChar, products.product_image_url)
            .input('product_description', mssql.VarChar, products.product_description)
            .input('product_price', mssql.Int, products.product_price)
            .input('product_in_stock', mssql.Int, products.product_in_stock)
            .input('product_category', mssql.VarChar, products.product_category)
            .execute('updateProduct')

        res.status(200)
            .json({ message: 'Product added successfully'})

    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getProductCount: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const productCount = await dbPool.request()
            .execute('getProductCount')
        res.status(200)
            .json(productCount.recordset[0])
    } catch (error: any) {
        res.json({ error: error.message })
    }
}