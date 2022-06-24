import express from 'express'
import { getAllUsers, getUserById, getUserByUserName, getUserCount, logIn, signUp } from '../controllers/authController'
const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.get('/', getAllUsers)
authRouter.get('/users', getUserCount)
authRouter.get('/:customer_id', getUserById)
authRouter.get('/email/:email', getUserByUserName)
authRouter.post('/signin', logIn)


export default authRouter