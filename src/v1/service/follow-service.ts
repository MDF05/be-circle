import { Follow, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class FollowService {

    async create(followerId: string, followingId: string): Promise<Follow> {
        const follow = await prisma.follow.create({ data: { followerId, followingId } })

        return follow
    }
    async find(followerId: string, followingId: string): Promise<Follow> {
        const follow = await prisma.follow.findFirst({ where: { followerId, followingId } })
        if (!follow) throw new Error("no follow found")

        return follow
    }

    async delete(id: string): Promise<typeof follow> {
        const follow = await prisma.follow.delete({ where: { id } })
        return follow
    }


    async findProfileFollowing(profileId: string) {
        const followers = await prisma.follow.findMany({ where: { followingId: profileId }, include: { follower: true } })
        return followers
    }

    async findProfileFollower(profileId: string) {
        const followers = await prisma.follow.findMany({ where: { followerId: profileId }, include: { following: true } })
        return followers
    }



}


export default new FollowService()