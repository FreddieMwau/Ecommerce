import express from 'express'
import cron from 'node-cron'

const app = express()
app.listen(5000, ()=>{
    console.log("Background Services running on port ====> 5000");
})

const mail = async () => {
    cron.schedule('*/5 * * * * *', async () => {
        console.log('Running after every 5 secs');
    })
}

// mail()