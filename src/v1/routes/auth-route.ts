import { Router } from "express";
import UserController from "../controllers/user-controller"

const AuthRoute = Router()

AuthRoute.post('/register', UserController.post)
AuthRoute.post('/login', UserController.get)



export default AuthRoute

