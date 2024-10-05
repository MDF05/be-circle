import express, { NextFunction, Request, Response, Express } from "express";
import createError from "./v1/utils/create-error";


import RouterV1 from "./version/v1";
// import RouterV2 from "./version/v2";
import errorResponse from "./v1/utils/error-response";
import cors from 'cors';





const app: Express = express()
const port = process.env.PORT || 3000



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static("./src/image"))


app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" })
})
app.use("/api/v1", RouterV1)
// app.use("/api/v2", RouterV2)


app.use("/", (req: Request, res: Response, next: NextFunction) => next(createError("PAGE NOT FOUND", 404)))
app.use(errorResponse)


app.listen(port, async () => {
    console.log(`listening on port ${port}`)
})