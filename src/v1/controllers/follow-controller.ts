import { NextFunction, Response } from "express";
import followService from "../service/follow-service";
import RequestExtUser from "../types/request-extends-user";
import createError from "../utils/create-error";
import succesResponse from "../utils/succes-response";

class FollowController {


    async post(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const followingId = req.user?.profile.id as string
            const followerId = req.params.followerId;

            const follow = await followService.create(followerId, followingId)
            succesResponse(res, "follow has been created", 200, follow)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 404))
            else next(createError("unknow error", 500))
        }
    }


    async get(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const followingId = req.user?.profile.id as string
            const followerId = req.params.followerId;
            const follow = await followService.find(followerId, followingId)
            succesResponse(res, "follow found", 200, follow)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 404))
            else next(createError("unknow error", 500))
        }
    }

    async delete(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const followId = req.params.followId
            const follow = await followService.delete(followId)
            succesResponse(res, "follow found", 200, follow)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 400))
            else next(createError("unknow error", 500))
        }
    }


    async getDataFollowing(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const profileId = req.params.profileId
            const follow = await followService.findProfileFollowing(profileId)
            succesResponse(res, "follow found", 200, follow)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 400))
            else next(createError("unknow error", 500))
        }
    }


    async getDataFollower(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const profileId = req.params.profileId
            const follow = await followService.findProfileFollower(profileId)
            succesResponse(res, "follow found", 200, follow)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 400))
            else next(createError("unknow error", 500))
        }
    }

}

export default new FollowController()