import { Router } from "express"
import AuthRoute from "../v1/routes/auth-route"
import UserRouter from "../v1/routes/user-route"
import Authenticate from "../v1/middlewate/authentication"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../../swagger/swagger-output.json"
import Authorization from "../v1/middlewate/authorization"
import ThreadRouter from "../v1/routes/thread-route"


export const RouterV1 = Router()


RouterV1.use('/', AuthRoute)
RouterV1.use('/user', Authenticate, Authorization("ADMIN"), UserRouter)
RouterV1.use('/thread', Authenticate, ThreadRouter)
RouterV1.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true
    }

}))



export default RouterV1