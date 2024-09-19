import { NextFunction, Request, Response } from "express";
import createError from "../utils/create-error";
import jwebtoken from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

export default function Authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        let token = req.header("Authorization");
        const startWith = /Bearer\ /.test(token as string)
        if (!token || !startWith) return next(createError("unauthorized", 401));

        token = token.replace("Bearer ", "")
        const verify = jwebtoken.verify(token, process.env.JWTPASSWORD as string)

        console.log(verify);


        next()
    } catch (err: unknown) {
        if (err instanceof Error) next(createError(err.message, 401));
        else next(createError("unknown error", 520));

    }
}