import { NextFunction, Request, Response } from "express";
import profileService from "../service/profile-service";
import createError from "../utils/create-error";
import succesResponse from "../utils/succes-response";
import RequestExtUser from "../types/request-extends-user";
import { configTypes } from "../service/types/profile-types";

class ProfillerController {
    async get(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const id = req.user?.profile.id as string
            const profile = await profileService.findUnique(id)
            if (!profile) throw new Error("user nof found")

            succesResponse(res, "data successfully retrieved", 200, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const profile = await profileService.findUnique(id)
            if (!profile) throw new Error("user nof found")

            succesResponse(res, "data successfully retrieved", 200, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async getMany(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const profileId = req.user?.profile.id as string
            const limit = req.query.limit as string

            const profile = await profileService.findMany(profileId, limit)

            succesResponse(res, "data successfully retrieved", 200, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


    async post(req: Request, res: Response, next: NextFunction) {
        try {
            const profile = await profileService.create(req.body)
            succesResponse(res, "data received", 201, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


    async postMany(req: Request, res: Response, next: NextFunction) {
        try {
            const profiles = await profileService.createMany(req.body)
            succesResponse(res, "data received", 201, profiles)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const profile = await profileService.delete(id)
            succesResponse(res, "data deleted", 200, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async deleteMany(req: Request, res: Response, next: NextFunction) {
        try {
            const listId = req.body
            const profiles = await profileService.deleteMany(listId)
            succesResponse(res, "data deleted", 200, profiles)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


    async updateOne(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const id = req.user?.profile.id


            const data = { ...req.body, id }
            if (req.files.image) data.image = `http://localhost:4000/assets/${req.files.image[0].filename}`
            if (req.files.cover) data.cover = `http://localhost:4000/assets/${req.files.cover[0].filename}`
            const profile = await profileService.updatePut(data)
            succesResponse(res, "data updated", 200, profile)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async updateMany(req: Request, res: Response, next: NextFunction) {
        try {
            const profiles = await profileService.updateMany(req.body)
            succesResponse(res, "data updated", 200, profiles)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }

    async searchUsername(req: RequestExtUser, res: Response, next: NextFunction) {
        try {
            const { username } = req.params
            const profileId = req.user?.profile.id as string
            const profiles = await profileService.searchByUsername(username, profileId)
            succesResponse(res, "data returned", 200, profiles)
        } catch (err: unknown) {
            if (err instanceof Error) next(createError(err.message, 401))
            else next(createError("unknown error", 520))
        }
    }


}



export default new ProfillerController();