import {v1 as uid} from 'uuid'
import mssql from 'mssql'
import sqlConfig from '../config/config'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { signInSchema } from '../helper/signinValidator'
import { signUpSchema } from '../helper/signupValidator'
dotenv.config()

export const signUp = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const customer_id = uid()
        const { full_name, email, customer_password } = req.body as { full_name: string, email: string, customer_password:string}
        const { error } = signUpSchema.validate(req.body)
        if (error) {
            return res.json({ error: error.details[0].message })
        }
        let dbPool = await mssql.connect(sqlConfig)
        const hashPwd = await bcrypt.hash(customer_password, 15)
        const user = await dbPool.request()
            .input('customer_id', mssql.VarChar, customer_id)
            .input('full_name', mssql.VarChar, full_name)
            .input('email', mssql.VarChar, email)
            .input('customer_password', mssql.VarChar, hashPwd)
            .execute('createUser')

        const data = user.recordset.map(record => {
            const { customer_password, ...rest } = record
            return rest
        })
        res.status(200)
            .json({message: 'New user created successfully', data})
    } catch(error:any){
        res.json({error: error.message})
    }
}

export const getAllUsers: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const users = await dbPool.request()
            .execute('getAllUsers')
        res.status(200)
            .json(users.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const getUserByUserName: RequestHandler<{email:string}> = async (req, res) => {
    try{
        const email = req.params.email
        let dbPool = await mssql.connect(sqlConfig)
        const user = await dbPool.request()
            .input('email', mssql.VarChar, email)
            .execute('getUserByUserName')
        if(!user.recordset[0]){
            return res.json({message: `User with email:${email} does not exist`})
        }
        res.status(200)
            .json(user.recordset)
    } catch (error: any) {
        res.json({ error: error.message })
    }
}

export const logIn: RequestHandler = async (req, res) => {
    try{
        let dbPool = await mssql.connect(sqlConfig)
        const { email, customer_password } = req.body as { email: string, customer_password: string }
        const { error } = signInSchema.validate(req.body)
        if(error){
            return res.json({error: error.details[0].message})
        }
        const user = await dbPool.request()
            .input('email', mssql.VarChar, email)
            .execute('getUserByUserName')
        const validatePwd = await bcrypt.compare(customer_password, user.recordset[0].customer_password)
        if(!validatePwd){
            return res.json({message: 'Invalid credentials, try again'})
        }
        const data = user.recordset.map(record => {
            const { customer_password, ...rest } = record
            return rest
        })
        res.status(200).json({ message: 'Logged in successfully', data })
    } catch (error: any) {
        res.json({ error: error.message })
    }
}