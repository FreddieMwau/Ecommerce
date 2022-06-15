import express from 'express'
import sqlConfig from './config/config'
import mssql from 'mssql'
import authRouter from './routes/authRoutes'

const app = express()
app.use(express.json())
app.use('/user', authRouter)

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