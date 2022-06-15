import {v1 as uid} from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

export const createUser = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const customer_id = uid()
        const { full_name, email, customer_password } = req.body as { full_name: string, email: string, customer_password:string}
        let dbPool = await mssql.connect(sqlConfig)
        const hashPwd = await bcrypt.hash(customer_password, 15)
        await dbPool.request()
            .input('customer_id', mssql.VarChar, customer_id)
            .input('full_name', mssql.VarChar, full_name)
            .input('email', mssql.VarChar, email)
            .input('customer_password', mssql.VarChar, hashPwd)
            .execute('createUser')

        res.status(200)
            .json({message: 'New user created successfully'})
    } catch(error:any){
        res.json({error: error.message})
    }
}