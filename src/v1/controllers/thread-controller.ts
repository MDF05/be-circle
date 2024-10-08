import { NextFunction, Request, Response } from "express";
import postService from "../service/thread-service";
import createError from "../utils/create-error";
import succesResponse from "../utils/succes-response";
import RequestExtUser from "../types/request-extends-user";
import cloudinaryService from "../service/cloudinary-service";

class ThreadController {
    async post(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            // const image = req.file?.filename
            // const body = { ...req.body, profileId: req?.user?.profile.id };
            // if (image) body.image = `http://localhost:4000/assets/${image}`
            
            const body = { ...req.body, profileId: req?.user?.profile.id };
            const file = req.file as Express.Multer.File
            if(file) body.image = (await cloudinaryService.upload(file)).url 
            
            const post = await postService.create(body);
            succesResponse(res, "post created successfully", 201, post)

        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const post = await postService.findUnique(id);

            succesResponse(res, "data received", 200, post)


        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }

    }


    async getMany(req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await postService.findMany();
            succesResponse(res, "data received", 200, posts)
        }
        catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const data = await postService.deleteOne(id);
            succesResponse(res, "data deleted", 200, data)
        }
        catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            const updatedData = await postService.update(id, req.body);
            succesResponse(res, "data updated", 200, updatedData)
        }
        catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async deleteMany(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            const data = await postService.deleteMany(id);
            succesResponse(res, "data deleted", 200, data)
        }
        catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

}


export default new ThreadController();