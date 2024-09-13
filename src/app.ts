import express, { NextFunction, Request, Response } from "express";
import createError, { CustomError } from "./utils/create-error";
import { PrismaClient } from "@prisma/client";
import RouterV1 from "./version/v1";

import dotenv from "dotenv"
import RouterV2 from "./version/v2";
dotenv.config()

const app = express()
const port = process.env.PORT || 6000
const version = process.env.version

const Prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/v1", RouterV1)
app.use("/api/v2", RouterV2)


app.use("/", (req: Request, res: Response, next: NextFunction) => {
    next(createError("PAGE NOT FOUND", 404))
})

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const message = err.message
    const stack = err.stack
    const name = err.name
    const status = err.status
    const succes = err.succes

    return res.json({
        author: "MUHAMMAD DAVA FAHREZA",
        aplication: "circle",
        version: version,
        succes,
        data: {
            name,
            status,
            message,
            stack,
        }
    }).status(status)
})


app.listen(port, async () => {
    await Prisma.$connect()
    console.log("berhasil connect ke database")
    console.log(`listening on port ${port}`)
})