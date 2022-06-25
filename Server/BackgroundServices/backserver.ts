import express from 'express'
import mssql from 'mssql'
import cron from 'node-cron'
import sqlConnect from './config/config'
import emailService from './mailService/mail'

const app = express()
app.listen(5000, ()=>{
    console.log("Background Services running on port ====> 5000");
})

const dbConnect = async () => {
    try{
        const y = await mssql.connect(sqlConnect)
        if(y.connected){
            console.log("Db connected flawlessly");
        }
    } catch (error: any) {
        console.log(error.message);
    }
}

const mail = async () => {
    cron.schedule('*/5 * * * * *', async () => {
        await emailService()
        console.log("Mail sent");
        console.log('Running after every 5 secs');
    })
}

mail()
dbConnect()