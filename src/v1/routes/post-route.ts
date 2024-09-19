import { Router } from "express";
import postController from "../controllers/post-controller";

const PostRouter = Router()

PostRouter.post("/", postController.post);
PostRouter.get("/:id", postController.get);
PostRouter.get("/", postController.getMany);
PostRouter.delete("/:id", postController.delete);
PostRouter.delete("/many", postController.deleteMany);
PostRouter.put("/:id", postController.update);


export default PostRouter;


