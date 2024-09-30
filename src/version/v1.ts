import { Router } from "express"
import AuthRoute from "../v1/routes/auth-route"
import UserRouter from "../v1/routes/user-route"
import Authenticate from "../v1/middlewate/authentication"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../../swagger/swagger-output.json"
import ThreadRouter from "../v1/routes/thread-route"
import LikeRouter from "../v1/routes/like-route"
import ProfileRouter from './../v1/routes/profile-route';
import { upload } from "../v1/middlewate/upload-image"
import FollowRouter from "../v1/routes/follow-route"


export const RouterV1 = Router()


RouterV1.use('/', AuthRoute)
RouterV1.use('/user', Authenticate, UserRouter)
RouterV1.use('/thread', Authenticate, upload.single("image"), ThreadRouter)
RouterV1.use("/like", Authenticate, LikeRouter)
RouterV1.use("/profile", Authenticate, upload.fields([{ name: "image" }, { name: "cover" }]), ProfileRouter)
RouterV1.use("/follow", Authenticate, FollowRouter)
RouterV1.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
    explorer: true,
    swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true
    }

}))



export default RouterV1