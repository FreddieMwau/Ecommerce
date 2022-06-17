import express from 'express'
import sqlConfig from './config/config'
import mssql from 'mssql'
import cors from 'cors'
import authRouter from './routes/authRoutes'
import productRouter from './routes/productRoutes'
import orderRouter from './routes/ordersRoutes'

const app = express()
app.use(cors(
    {origin: true}
))
app.use(express.json())
app.use('/user', authRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)

app.listen(7000, () => {
    console.log("====> Server launched on port 7000");
})

const dbConnection = async () => {
    try{
        const z = await mssql.connect(sqlConfig)
        if(z.connected){
            console.log("Db connected flawlessly");
        }
    } catch (error:any){
        console.log(error.message);
    }
}

dbConnection()