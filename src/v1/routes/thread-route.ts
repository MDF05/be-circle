import { Router } from "express";
import threadController from "../controllers/thread-controller";

const ThreadRouter = Router()

ThreadRouter.post("/", threadController.post);
ThreadRouter.get("/:id", threadController.get);
ThreadRouter.get("/", threadController.getMany);
ThreadRouter.delete("/:id", threadController.delete);
ThreadRouter.delete("/many", threadController.deleteMany);
ThreadRouter.put("/:id", threadController.update);


export default ThreadRouter;


