import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploader(images: Express.Multer.File): Promise<string | null> {
    try {
      const b64 = Buffer.from(images.buffer).toString("base64");
      const dataURI = `data:${images.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataURI, { folder: "b56-circle" });

      return result.url;
    } catch (err) {
      return null;
    }
  }
  async multipleUploader(images: Express.Multer.File[]): Promise<string[] | null> {
    try {
      const imageUrl: string[] = [];
      await Promise.all(
        images.map(async (file) => {
          const b64 = Buffer.from(file.buffer).toString("base64");
          const dataURI = `data:${file.mimetype};base64,${b64}`;
          const result = await cloudinary.uploader.upload(dataURI, { folder: "b56-circle" });
          imageUrl.push(result.secure_url);
        }),
      );
      return imageUrl;
    } catch (err) {
      return null;
    }
  }
}

export default new Cloudinary();
