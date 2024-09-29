import { Router } from "express"
import likeController from "../controllers/like-controller"
const LikeRouter = Router()


LikeRouter.post('/:threadId', likeController.add)
LikeRouter.get('/:threadId', likeController.check)
LikeRouter.delete('/:likeId', likeController.delete)


export default LikeRouter