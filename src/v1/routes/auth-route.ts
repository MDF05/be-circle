import { Router } from "express";
import AuthController from "../controllers/auth-controller";

const AuthRoute = Router()


AuthRoute.post("/validate-token", AuthController.validateToken)
AuthRoute.post('/register', AuthController.register)
AuthRoute.post('/login', AuthController.login)
AuthRoute.get("/google", AuthController.google)
AuthRoute.get("/google/callback", AuthController.googleCallback)
AuthRoute.get("/forgot-password", AuthController.forgotPassword)




export default AuthRoute

