import RouterV1 from "./v1";
import { Router } from "express"

const RouterV2 = Router()

RouterV2.get("/test", (req, res, next) => res.json({ data: "test" }))
RouterV2.get("/user", (req, res, next) => res.json({ data: "asiap" }))
RouterV2.get("/", (req, res, next) => res.json({ documentation: "no documentation yet" }))
RouterV2.use(RouterV1)


export default RouterV2

