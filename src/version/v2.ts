import RouterV1 from "./v1";
import { Router } from "express"

const RouterV2 = Router()


RouterV2.use("/", RouterV1)
RouterV2.get("/test", (req, res, next) => res.json({ data: "asiap" }))


export default (RouterV2)

