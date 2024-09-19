import { Router } from "express"
import AuthRoute from "../v1/routes/auth-route"
import UserRouter from "../v1/routes/user-route"
import PostRouter from "../v1/routes/post-route"
import Authenticate from "../v1/middlewate/authentication"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../../swagger/swagger-output.json"


export const RouterV1 = Router()

RouterV1.use('/', AuthRoute)
RouterV1.use('/user', Authenticate, UserRouter)
RouterV1.use('/post', Authenticate, PostRouter)
RouterV1.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument))



export default RouterV1