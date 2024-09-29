import { Router } from "express";
import profileController from "../controllers/profile-controller";
import { upload } from "../middlewate/upload-image";


const ProfileRoute = Router()


ProfileRoute.put('/', profileController.updateOne)
ProfileRoute.get('/', profileController.get)

export default ProfileRoute

