import { PrismaClient, Profile as ProfileTypes } from "@prisma/client";
import { configTypes } from "./types/profile-types";

const prisma = new PrismaClient()

class profileService {

    async findUnique(id: string): Promise<ProfileTypes | null> {
        const profile = await prisma.profile.findUnique({
            where: { id: id }, include: {
                thread: {
                    where: { threadId: null },
                    orderBy: { createdAt: 'desc' },
                    include: {
                        profile: {
                            select: { id: true, image: true, fullName: true }
                        },
                        _count: {
                            select: { like: true, replies: true }
                        }, replies: true

                    }
                },
                _count: {
                    select: { follower: true, following: true }
                }
            }
        })
        return profile
    }



    async findMany(id: string, limit: string): Promise<ProfileTypes[]> {
        const configs = {} as configTypes
        if (limit) configs.take = 3

        const profile = await prisma.profile.findMany({
            where: {
                id: {
                    notIn: [id]
                }
            },
            ...configs
        })
        return profile
    }


    async create(data: ProfileTypes): Promise<ProfileTypes> {
        const profile = await prisma.profile.create({ data })
        return profile
    }

    async createMany(data: ProfileTypes[]): Promise<ProfileTypes[]> {
        const profiles = await prisma.profile.createManyAndReturn({ data })
        return profiles;
    }


    async updateMany(data: ProfileTypes[]): Promise<ProfileTypes[] | any> {
        const profile = await prisma.profile.updateMany({
            where: { id: { in: data.map((item) => item.id) } },
            data: data,
        });
        return profile;
    }


    async delete(data: string): Promise<ProfileTypes> {
        const profile = await prisma.profile.delete({ where: { id: data }, });
        return profile;
    }

    async deleteMany(data: string[]): Promise<any> {
        const profile = await prisma.profile.deleteMany({ where: { id: { in: data } } });
        return profile;
    }


    async updatePut(data: ProfileTypes): Promise<ProfileTypes> {
        const profile = await prisma.profile.update({
            where: { id: data.id },
            data: data,
        });
        return profile;
    }

    async updatePatch(data: ProfileTypes, dataUpdate: object): Promise<ProfileTypes | null> {
        const profile = await prisma.profile.update({
            where: { id: data.id },
            data: { ...data, ...dataUpdate },
        });
        return profile;
    }


    async searchByUsername(fullName: string, profileId: string): Promise<ProfileTypes[]> {
        const profile = await prisma.profile.findMany({
            where: {
                fullName: {
                    contains: fullName,
                    mode: 'insensitive'
                },
                id: {
                    notIn: [profileId]
                }
            }
        })
        return profile;
    }



}


export default new profileService()

