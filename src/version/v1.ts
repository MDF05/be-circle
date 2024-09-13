import { Router } from "express"
import AuthRoute from "../v1/routes/auth-route"
import UserRouter from "../v1/routes//user-routes"


export const RouterV1 = Router()

RouterV1.use('/', AuthRoute)
RouterV1.use('/user', UserRouter)



export default RouterV1