import dotenv from 'dotenv'
import ejs from 'ejs'
import mssql from 'mssql'
import sqlConnect from '../config/config'
import sendMail from '../helper/mailer'

dotenv.config()

interface userDetails {
    customer_id:string
    full_name:string
    email:string
    isEmailSent:boolean
}

interface orderDetails {
    order_id:string
    product_name:string
    email:string
    isOrderMailSent:boolean
    full_name:string
    quantity_ordered:number
    total_price:number
}
const emailService = async () => {
    const db = await mssql.connect(sqlConnect)
    console.log("db connected at mail service");
    const users: userDetails[] = (await db.request()
        .execute('getUnemailedUsers')).recordset
    console.log(users);

    const orders: orderDetails[] = (await db.request()
        .execute('allOrders')).recordset

    for (let user of users){
        console.log("User emails");
        ejs.renderFile(`./template/registration.ejs`, {name:user.full_name}, async (error, data) => {
            if(error){
                console.log(error);
            }
            const mailOption = {
                from: process.env.EMAIL as string,
                to: user.email as string, 
                subject:"",
                text:"",
                html:data
            }
            try{
                await sendMail(mailOption)
                await db.request()
                    .input('customer_id', mssql.VarChar, user.customer_id)
                    .execute('userMailed')
                console.log("User mail sent");
                
            } catch (error) {
                console.log(error);
            }
        })
        
    }
}

export default emailService