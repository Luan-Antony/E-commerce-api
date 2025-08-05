import { Router } from 'express'
import { UsersController } from '../http/controllers/users-controller'
import { authMiddleware } from '../middlewares/auth'

const usersRouter = Router()

usersRouter.post('/', new UsersController().create)
usersRouter.post('/login', new UsersController().login)
usersRouter.get('/profile', authMiddleware, new UsersController().profile)

export { usersRouter }