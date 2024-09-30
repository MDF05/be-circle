import { Follow, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class FollowService {

    async create(followerId: string, followingId: string): Promise<Follow> {
        const follow = await prisma.follow.create({ data: { followerId, followingId } })

        return follow
    }
    async find(followerId: string, followingId: string): Promise<Follow> {
        const follow = await prisma.follow.findFirstOrThrow({ where: { followerId, followingId } })

        return follow
    }

    async delete(id: string): Promise<typeof follow> {
        const follow = await prisma.follow.delete({ where: { id } })
        return follow
    }




}


export default new FollowService()