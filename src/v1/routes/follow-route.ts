import { Router } from "express";
import followController from "../controllers/follow-controller";

const FollowRouter = Router()


FollowRouter.post('/:followerId', followController.post)
FollowRouter.get('/:followerId', followController.get)
FollowRouter.delete('/:followId', followController.delete)
FollowRouter.get('/following/:profileId', followController.getDataFollowing)
FollowRouter.get('/follower/:profileId', followController.getDataFollower)

export default FollowRouter