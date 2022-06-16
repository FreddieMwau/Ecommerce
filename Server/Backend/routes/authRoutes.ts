import express from 'express'
import { getAllUsers, getUserByUserName, logIn, signUp } from '../controllers/authController'
const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.get('/', getAllUsers)
authRouter.get('/:email', getUserByUserName)
authRouter.post('/signin', logIn)


export default authRouter