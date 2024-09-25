import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import jwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
import RequestExtUser from "./types/request-extends-user";
import { User } from "@prisma/client";

dotenv.config()


export default function Authenticate(req: RequestExtUser, res: Response, next: NextFunction) {
    try {
        /* #swagger.security = [{
            "bearerAuth": []
        }] */

        let token = req.header("Authorization");
        console.log(token)

        const startWith = /Bearer\ /.test(token as string)
        if (!token || !startWith) return next(createError("unauthorized", 401));

        token = token.replace("Bearer ", "")
        const verify = jwebtoken.verify(token, process.env.JWTPASSWORD as string);
        req.user = verify as User
        next()
    } catch (err: unknown) {
        if (err instanceof Error) next(createError(err.message, 401));
        else next(createError("unknown error", 520));

    }
}