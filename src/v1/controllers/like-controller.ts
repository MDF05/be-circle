import { NextFunction, Response } from "express";
import createError from "../utils/create-error";
import succesResponse from "../utils/succes-response";
import RequestExtUser from './../types/request-extends-user';
import likeService from "../service/like-service";

class likeController {
    async add(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const threadId = req.params.threadId
            const userId = req.user?.id as string

            const like = await likeService.createLike(userId, threadId,)
            succesResponse(res, "like added", 200, like)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 403))
            else next(createError("unknown error", 501))
        }
    }

    async check(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const threadId = req.params.threadId
            const userId = req.user?.id as string
            const like = await likeService.checkLike(userId, threadId)
            succesResponse(res, "like found", 200, like)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 403))
            else next(createError("unknown error", 501))
        }
    }

    async delete(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const likeId = req.params.likeId
            const like = await likeService.delete(likeId)
            succesResponse(res, "like found", 200, like)
        } catch (err) {
            if (err instanceof Error) next(createError(err.message, 403))
            else next(createError("unknown error", 501))
        }
    }
}


export default new likeController()