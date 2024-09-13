import { User as UserTypes } from "@prisma/client";
import User from "../../v1/service/user-service";
import createError from "../../v1/utils/create-error";
import { NextFunction, Request, Response } from "express";

class UserController {
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body
            const user = await User.find(id);

            res.json({ user }).status(200)
        } catch (err: any) {
            next(createError(err.message, 401))
        }
    }
    async getMany(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await User.findMany();

            res.json({ user }).status(200)
        } catch (err: any) {
            next(createError(err.message, 401))
        }
    }

    async post(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const user = await User.create(req.body);

            res.json({ user }).status(201)
        } catch (err: any) {
            next(createError(err.message, 400))
        }
    }

}


export default new UserController();