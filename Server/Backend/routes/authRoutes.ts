import express from 'express'
import { createUser } from '../controllers/authController'
const authRouter = express.Router()

authRouter.post('/signin', createUser)


export default authRouter