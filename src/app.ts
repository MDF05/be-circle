import express, { NextFunction, Request, Response } from "express";
import createError from "./v1/utils/create-error";
import { PrismaClient } from "@prisma/client";

import RouterV1 from "./version/v1";
import RouterV2 from "./version/v2";
import errorResponse from "./v1/utils/error-response";


const app = express()
const port = process.env.PORT || 3000

const Prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/api/v1", RouterV1)
app.use("/api/v2", RouterV2)


app.use("/", (req: Request, res: Response, next: NextFunction) => next(createError(404)))
app.use(errorResponse)


app.listen(port, async () => {
    await Prisma.$connect()
    console.log("berhasil connect ke database")
    console.log(`listening on port ${port}`)
})