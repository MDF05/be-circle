import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary"
dotenv.config()

class CloudinaryService {

    constructor() {
     cloudinary.config({
      cloud_name : process.env.CLOUDINARY_NAME,
      api_secret : process.env.CLOUDINARY_SECRET,
      api_key : process.env.CLOUDINARY_KEY
     })
    }



      async upload(file : Express.Multer.File) {
       
          const buffer = Buffer.from(file.buffer).toString("base64")
          const dataURI = "data:" + file.mimetype + ";base64," + buffer

         return await cloudinary.uploader.upload(dataURI,{
          folder : "b56-circle"
         })
       }
}


export default new CloudinaryService()