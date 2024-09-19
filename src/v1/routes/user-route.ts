
import { Router } from 'express'
import userController from '../controllers/user-controller'


const UserRouter = Router()


UserRouter.get("/", userController.getMany)
UserRouter.post("/", userController.get)


export default UserRouter