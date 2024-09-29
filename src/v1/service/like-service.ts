import { PrismaClient, Like as LikeTypes } from "@prisma/client";

const prisma = new PrismaClient();

class likeService {
    async createLike(userId: string, threadId: string,): Promise<LikeTypes> {
        const updateLike = await prisma.like.create({
            data: {
                userId,
                threadId,
            }
        });
        return updateLike;
    }


    async checkLike(userId: string, threadId: string): Promise<LikeTypes> {
        const likeInfo = await prisma.like.findFirst({
            where: {
                userId,
                threadId
            }, include: {
                thread: {
                    select: {
                        _count: true
                    }
                },
            }
        });
        if (!likeInfo) throw new Error(`User not found`);

        return likeInfo;
    }
    async delete(id: string): Promise<LikeTypes> {
        const like = await prisma.like.delete({
            where: {
                id
            }
        });

        return like;
    }
}


export default new likeService()