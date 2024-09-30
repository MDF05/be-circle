import { Router } from "express";
import profileController from "../controllers/profile-controller";
import { upload } from "../middlewate/upload-image";


const ProfileRouter = Router()


ProfileRouter.put('/', profileController.updateOne)
ProfileRouter.get('/', profileController.getMany)
ProfileRouter.get('/:id', profileController.getById)
ProfileRouter.get('/search/:username', profileController.searchUsername)


export default ProfileRouter

