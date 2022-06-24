import dotenv from 'dotenv'
import ejs from 'ejs'
import mssql from 'mssql'
import sqlConnect from '../config/config'

dotenv.config()

interface userDet {
    customer_id:string
    full_name:string
    email:string
    isEmailSent:boolean
}
const emailService = async () => {
    const db = await mssql.connect(sqlConnect)
    console.log("db connected at mail service");
    const users:userDet[] = (await db.request()
        .execute('getUnemailedUsers')).recordset
    console.log(users);
    
    
}

export default emailService