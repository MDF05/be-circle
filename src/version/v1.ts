import { Router } from "express"
import AuthRoute from "../routes/v1/auth-route"
import UserRouter from "../routes/v1/user-routes"


export const RouterV1 = Router()

RouterV1.use('/', AuthRoute)
RouterV1.use('/user', UserRouter)



export default RouterV1