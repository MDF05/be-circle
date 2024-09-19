import { NextFunction, Request, Response } from "express"
import { CustomError } from "./create-error"
import dotenv from "dotenv"
dotenv.config()

export default function errorResponse(err: CustomError, req: Request, res: Response, next: NextFunction) {
    const message = err.message
    const stack = err.stack
    const name = err.name
    const status = err.status
    const succes = err.succes

    return res.json({
        succes,
        author: "MUHAMMAD DAVA FAHREZA",
        aplication: "circle",
        version: process.env.version,
        message,
        date: new Date(),
        status,
        data: [
            {
                name,
                protocol: req.protocol,
                host: req.get("host"),
                endPoint: req.originalUrl,
                method: req.method,
                userAgent: req.headers["user-agent"],
                ip: req.ip,
                ips: req.ips,
                stack,
            }]


    }).status(status)
}