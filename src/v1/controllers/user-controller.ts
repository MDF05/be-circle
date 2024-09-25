import { User as UserTypes } from "@prisma/client";
import User from "../../v1/service/user-service";
import createError from "../../v1/utils/create-error";
import { NextFunction, Request, Response } from "express";
import succesResponse from "../utils/succes-response";

class UserController {
    async get(req: Request, res: Response, next: NextFunction) {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */
        try {
            const { id } = req.body
            if (!id) throw new Error("id is required")

            const user = await User.find(id);

            succesResponse(res, "data received", 200, user)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 401))
        }
    }

    async getMany(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findMany();
            succesResponse(res, "data received", 200, user)

        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 401))
        }

    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.create(req.body);

            succesResponse(res, "data received", 201, user)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 400))
            else next(createError("unknown error", 400))
        }
    }


}


export default new UserController();